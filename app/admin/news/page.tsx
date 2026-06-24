"use client";

import React, { useEffect, useState, useRef } from "react";
import { gooeyToast } from "goey-toast";
import {
  Plus, Pencil, Trash2, X, Image as ImageIcon,
  FolderOpen, Camera, Eye, EyeOff, Search, Calendar,
  ExternalLink,
} from "lucide-react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { TiptapEditor } from "../components/TiptapEditor";

// ─── Types ───────────────────────────────────────────────
interface News {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  category: string | null;
  slug: string | null;
  status: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

const EMPTY_NEWS: Omit<News, "id" | "created_at" | "updated_at"> = {
  title: "",
  content: "",
  thumbnail: null,
  category: "ประชาสัมพันธ์",
  slug: "",
  status: 1,
  view_count: 0,
};

// ─── Modal ───────────────────────────────────────────────
function WideModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function NewsAdminPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Editor modal
  const [editorModal, setEditorModal] = useState(false);
  const [editNews, setEditNews] = useState<Partial<News> | null>(null);

  // Thumbnail
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => { },
  });

  const showToast = (title: string, type: "ok" | "err" = "ok", description?: string) => {
    if (type === "ok") {
      gooeyToast.success(title, { description, preset: "snappy" });
    } else {
      gooeyToast.error(title, { description, preset: "snappy" });
    }
  };

  const openConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };
  const closeConfirm = () => setConfirmDialog((p) => ({ ...p, open: false }));

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      setNewsList(data.news ?? []);
    } catch {
      showToast("โหลดข้อมูลไม่สำเร็จ", "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddNews = () => {
    setEditNews({ ...EMPTY_NEWS });
    setImagePreview(null);
    setEditorModal(true);
  };

  const openEditNews = (n: News) => {
    setEditNews({ ...n });
    setImagePreview(n.thumbnail);
    setEditorModal(true);
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "อัปโหลดไม่สำเร็จ");
      }

      setImagePreview(data.url);
      setEditNews((prev) => ({ ...prev, thumbnail: data.url }));
      showToast("อัปโหลดรูปหน้าปกสำเร็จ");
    } catch (err: any) {
      showToast("อัปโหลดไม่สำเร็จ", "err", err.message);
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const saveNews = async () => {
    if (!editNews?.title) return showToast("กรุณาใส่หัวข้อข่าว", "err");
    if (!editNews?.slug) return showToast("กรุณาใส่ Slug", "err");

    const isEdit = !!editNews.id;
    const url = isEdit ? `/api/admin/news/${editNews.id}` : "/api/admin/news";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editNews),
    });

    if (res.ok) {
      showToast(isEdit ? "บันทึกข่าวสำเร็จ" : "เพิ่มข่าวสำเร็จ");
      setEditorModal(false);
      fetchData();
    } else {
      showToast("เกิดข้อผิดพลาด", "err");
    }
  };

  const deleteNews = (id: number) => {
    openConfirm(
      "ลบข่าวสาร",
      "คุณต้องการลบข่าวสารนี้ใช่หรือไม่? ข้อมูลจะไม่สามารถกู้คืนได้",
      async () => {
        closeConfirm();
        const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("ลบข่าวสารสำเร็จ");
          fetchData();
        } else {
          showToast("เกิดข้อผิดพลาด", "err");
        }
      }
    );
  };

  const filteredNews = newsList.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.category && n.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p>กำลังโหลดข่าวสาร...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการข่าวสาร</h1>
          <p className="text-gray-500 text-sm mt-1">สร้างและแก้ไขข่าวสารประชาสัมพันธ์ขององค์กร</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="ค้นหาข่าวสาร..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={openAddNews}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-shadow shadow-sm"
          >
            <Plus size={18} /> เขียนข่าวใหม่
          </button>
        </div>
      </div>

      {/* Grid or Table? Let's do a List view for News */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 px-6">
            <FolderOpen size={48} className="mx-auto text-gray-200 mb-4" strokeWidth={1} />
            <p className="text-gray-500">ไม่พบข่าวสารที่ต้องการ</p>
            <button onClick={openAddNews} className="text-blue-600 hover:underline mt-2 text-sm">
              เพิ่มข่าวสารแรกของคุณ
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNews.map((news) => (
              <div key={news.id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4 group">
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative border border-gray-100">
                  {news.thumbnail ? (
                    <img src={news.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={24} />
                    </div>
                  )}
                  {news.status === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white bg-gray-500 px-1.5 py-0.5 rounded">DRAFT</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {news.category || "General"}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(news.created_at).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-400">👀 {news.view_count} views</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditNews(news)}
                    className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    title="แก้ไขเนื้อหา"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteNews(news.id)}
                    className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    title="ลบ"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <WideModal open={editorModal} onClose={() => setEditorModal(false)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {editNews?.id ? "แก้ไขข่าวสาร" : "เขียนข่าวสารใหม่"}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditorModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">หัวข้อข่าวสาร</label>
              <input
                type="text"
                className="w-full text-lg font-bold border-b-2 border-gray-100 focus:border-blue-500 outline-none pb-2 transition-colors"
                placeholder="พิมพ์หัวข้อข่าวที่นี่..."
                value={editNews?.title || ""}
                onChange={(e) => setEditNews(p => ({ ...p!, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เนื้อหา</label>
              <TiptapEditor
                content={editNews?.content || ""}
                onChange={(html) => setEditNews(p => ({ ...p!, content: html }))}
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">การเผยแพร่</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={editNews?.status === 1}
                    onChange={() => setEditNews(p => ({ ...p!, status: 1 }))}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">เผยแพร่ทันที</p>
                    <p className="text-[10px] text-gray-500">ข่าวจะปรากฏบนหน้าเว็บไซต์ทันที</p>
                  </div>
                  <Eye className="text-emerald-500" size={16} />
                </label>
                <label className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={editNews?.status === 0}
                    onChange={() => setEditNews(p => ({ ...p!, status: 0 }))}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">บันทึกร่าง</p>
                    <p className="text-[10px] text-gray-500">เก็บไว้แก้ไขต่อ ยังไม่แสดงผล</p>
                  </div>
                  <EyeOff className="text-gray-400" size={16} />
                </label>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">รูปหน้าปก</h3>
              <div
                className="aspect-video bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors relative"
                onClick={() => !uploading && fileRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-xs text-gray-500 font-medium">เพิ่มรูปหน้าปก</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleThumbnailChange} />
              <p className="text-[10px] text-gray-400 mt-2 text-center">แนะนำขนาด 1200 x 630 px (16:9)</p>
            </div>

            {/* Category */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">หมวดหมู่</h3>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editNews?.category || "ประชาสัมพันธ์"}
                onChange={(e) => setEditNews(p => ({ ...p!, category: e.target.value }))}
              >
                <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
                <option value="ข่าวรับสมัครงาน">ข่าวรับสมัครงาน</option>
                <option value="ข่าวกิจกรรม">ข่าวกิจกรรม</option>
                <option value="ข่าวประกาศ">ข่าวประกาศ</option>
              </select>
            </div>

            {/* Slug */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Slug (URL)</h3>
              <input
                type="text"
                placeholder="news-title-example"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editNews?.slug || ""}
                onChange={(e) => setEditNews(p => ({ ...p!, slug: e.target.value }))}
              />
              <p className="text-[10px] text-gray-400 mt-2 italic">เช่น my-news-title</p>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setEditorModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                ยกเลิก
              </button>
              <button
                onClick={saveNews}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                disabled={uploading}
              >
                บันทึกข่าว
              </button>
            </div>
          </div>
        </div>
      </WideModal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}
