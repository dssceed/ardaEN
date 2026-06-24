"use client";

import React, { useEffect, useState, useRef } from "react";
import { gooeyToast } from "goey-toast";
import {
  Plus, Pencil, Trash2, X, UserCircle, Upload,
  Link2, FolderOpen, Users, Camera, ChevronLeft, ChevronRight,
  Eye, EyeOff,
} from "lucide-react";
import { ConfirmDialog } from "../components/ConfirmDialog";

// ─── Types ───────────────────────────────────────────────
interface Member {
  id: number;
  section_id: number;
  title: string | null;
  first_name: string;
  last_name: string;
  position_th: string | null;
  position_en: string | null;
  phone: string | null;
  email: string | null;
  image: string | null;
  col_order: number;
  row_order: number;
  status: number;
}

interface Section {
  id: number;
  name_th: string;
  name_en: string | null;
  rank: number;
  members: Member[];
}

const EMPTY_MEMBER: Omit<Member, "id" | "section_id"> = {
  title: "",
  first_name: "",
  last_name: "",
  position_th: "",
  position_en: "",
  phone: "",
  email: "",
  image: null,
  col_order: 0,
  row_order: 0,
  status: 1,
};

// ─── Modal ───────────────────────────────────────────────
function Modal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

// ─── Member Card ─────────────────────────────────────────
function MemberCard({
  member,
  onEdit,
  onDelete,
}: {
  member: Member;
  onEdit: (m: Member) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm relative group overflow-hidden">
      {/* Action buttons */}
      <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onEdit(member)}
          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          title="แก้ไข"
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          title="ลบ"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Card body — horizontal */}
      <div className="flex items-center gap-4 p-4">
        {/* Photo */}
        <div className="shrink-0">
          {member.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-400 ring-offset-2"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 ring-2 ring-blue-200 ring-offset-2 flex items-center justify-center text-gray-400">
              <UserCircle size={44} strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-8">
          <p className="font-bold text-gray-800 text-base leading-snug">
            {member.title ? `${member.title} ` : ""}
            {member.first_name} {member.last_name}
          </p>
          {member.position_th && (
            <p className="text-sm text-gray-500 mt-0.5 leading-snug">{member.position_th}</p>
          )}
          {member.position_en && (
            <p className="text-xs text-gray-400 leading-snug">{member.position_en}</p>
          )}
          <div className="mt-2 space-y-0.5">
            {member.phone && (
              <p className="text-xs text-gray-600">
                <span className="text-gray-400">โทร :</span> {member.phone}
              </p>
            )}
            {member.email && (
              <p className="text-xs text-gray-600 truncate">
                <span className="text-gray-400">อีเมล :</span> {member.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status bar — only when hidden */}
      {member.status === 0 && (
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-1.5 flex items-center gap-1 text-xs text-gray-400">
          <EyeOff size={11} /> ซ่อนจากหน้าเว็บ
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function ExecutivesAdminPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Section modal
  const [sectionModal, setSectionModal] = useState(false);
  const [editSection, setEditSection] = useState<Partial<Section> | null>(null);

  // Member modal
  const [memberModal, setMemberModal] = useState(false);
  const [editMember, setEditMember] = useState<Partial<Member> | null>(null);
  const [memberSectionId, setMemberSectionId] = useState<number | null>(null);

  // Image
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrlInput, setImageUrlInput] = useState("");
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
  const openConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };
  const closeConfirm = () => setConfirmDialog((p) => ({ ...p, open: false }));

  // ─ Helpers ─
  const showToast = (title: string, type: "ok" | "err" = "ok", description?: string) => {
    if (type === "ok") {
      gooeyToast.success(title, { description, preset: "snappy" });
    } else {
      gooeyToast.error(title, { description, preset: "snappy" });
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/executives");
      const data = await res.json();
      setSections(data.sections ?? []);
    } catch {
      showToast("โหลดข้อมูลไม่สำเร็จ", "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ─ Group members into rows (max 2 per row) ─
  const groupByRow = (members: Member[]) => {
    const sorted = [...members].sort(
      (a, b) => a.row_order - b.row_order || a.col_order - b.col_order
    );
    const rowMap = new Map<number, Member[]>();
    sorted.forEach((m) => {
      if (!rowMap.has(m.row_order)) rowMap.set(m.row_order, []);
      rowMap.get(m.row_order)!.push(m);
    });
    const rows: Member[][] = [];
    rowMap.forEach((row) => rows.push(row));
    return rows;
  };

  // ─── Section CRUD ───
  const openAddSection = () => {
    setEditSection({ name_th: "", name_en: "", rank: sections.length * 10 });
    setSectionModal(true);
  };

  const openEditSection = (s: Section) => {
    setEditSection({ ...s });
    setSectionModal(true);
  };

  const saveSection = async () => {
    if (!editSection?.name_th) return showToast("กรุณาใส่ชื่อ section", "err");
    const isEdit = !!editSection.id;
    const url = isEdit
      ? `/api/admin/executives/sections/${editSection.id}`
      : "/api/admin/executives/sections";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name_th: editSection.name_th,
        name_en: editSection.name_en || null,
        rank: editSection.rank ?? 0,
      }),
    });

    if (res.ok) {
      showToast(isEdit ? "แก้ไข Section สำเร็จ" : "เพิ่ม Section สำเร็จ");
      setSectionModal(false);
      fetchData();
    } else {
      showToast("เกิดข้อผิดพลาด", "err");
    }
  };

  const deleteSection = (id: number) => {
    openConfirm(
      "ลบ Section",
      "ต้องการลบ Section นี้? ข้อมูลสมาชิกทั้งหมดใน Section จะถูกลบด้วย",
      async () => {
        closeConfirm();
        const res = await fetch(`/api/admin/executives/sections/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("ลบ Section สำเร็จ");
          fetchData();
        } else {
          showToast("เกิดข้อผิดพลาด", "err");
        }
      }
    );
  };

  // ─── Member CRUD ───
  const openAddMember = (sectionId: number) => {
    const sectionMembers = sections.find((s) => s.id === sectionId)?.members ?? [];
    const maxRow = sectionMembers.length > 0
      ? Math.max(...sectionMembers.map((m) => m.row_order))
      : -1;
    setMemberSectionId(sectionId);
    setEditMember({
      ...EMPTY_MEMBER,
      section_id: sectionId,
      row_order: maxRow + 1,
      col_order: 0,
    });
    setImagePreview(null);
    setImageMode("upload");
    setImageUrlInput("");
    setMemberModal(true);
  };

  const openEditMember = (m: Member) => {
    setMemberSectionId(m.section_id);
    setEditMember({ ...m });
    const img = m.image || null;
    const isUrl = img && !img.startsWith("data:");
    setImageMode(isUrl ? "url" : "upload");
    setImageUrlInput(isUrl ? img : "");
    setImagePreview(img);
    setMemberModal(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview ทันทีโดยใช้ object URL ก่อน
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    // Upload ไปยัง server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "อัปโหลดไม่สำเร็จ", "err");
        setImagePreview(null);
        return;
      }

      // เปลี่ยน preview เป็น URL จริง และเก็บใน field
      setImagePreview(data.url);
      setEditMember((prev) => ({ ...prev, image: data.url }));
      showToast("อัปโหลดรูปภาพสำเร็จ");
    } catch (err: any) {
      showToast("อัปโหลดไม่สำเร็จ", "err", err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
      setImagePreview(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const saveMember = async () => {
    if (!editMember?.first_name || !editMember?.last_name) {
      return showToast("กรุณาใส่ชื่อและนามสกุล", "err");
    }
    const isEdit = !!editMember.id;
    const url = isEdit
      ? `/api/admin/executives/members/${editMember.id}`
      : "/api/admin/executives/members";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section_id: memberSectionId,
        title: editMember.title || null,
        first_name: editMember.first_name,
        last_name: editMember.last_name,
        position_th: editMember.position_th || null,
        position_en: editMember.position_en || null,
        phone: editMember.phone || null,
        email: editMember.email || null,
        image: editMember.image || null,
        col_order: Number(editMember.col_order ?? 0),
        row_order: Number(editMember.row_order ?? 0),
        status: Number(editMember.status ?? 1),
      }),
    });

    if (res.ok) {
      showToast(isEdit ? "แก้ไขสมาชิกสำเร็จ" : "เพิ่มสมาชิกสำเร็จ");
      setMemberModal(false);
      fetchData();
    } else {
      showToast("เกิดข้อผิดพลาด", "err");
    }
  };

  const deleteMember = (id: number) => {
    openConfirm(
      "ลบสมาชิก",
      "ต้องการลบสมาชิกคนนี้? ข้อมูลจะไม่สามารถกู้คืนได้",
      async () => {
        closeConfirm();
        const res = await fetch(`/api/admin/executives/members/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("ลบสมาชิกสำเร็จ");
          fetchData();
        } else {
          showToast("เกิดข้อผิดพลาด", "err");
        }
      }
    );
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageUrlInput("");
    setEditMember((p) => ({ ...p, image: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  // ─── Render ───
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการรายชื่อผู้บริหาร</h1>
          <p className="text-gray-500 text-sm mt-1">จัดการ Section และรายชื่อผู้บริหารแต่ละกลุ่ม</p>
        </div>
        <button
          onClick={openAddSection}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> เพิ่ม Section
        </button>
      </div>

      {/* Sections */}
      {sections.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <FolderOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">ยังไม่มี Section กรุณาเพิ่ม Section ก่อน</p>
          <button
            onClick={openAddSection}
            className="mt-4 text-blue-600 hover:underline text-sm flex items-center gap-1 mx-auto"
          >
            <Plus size={14} /> เพิ่ม Section แรก
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={section.id}>
              {idx > 0 && <hr className="border-gray-200 mb-8" />}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{section.name_th}</h2>
                    {section.name_en && (
                      <p className="text-sm text-gray-500">{section.name_en}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Users size={11} /> {section.members.length} คน · ลำดับ {section.rank}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openAddMember(section.id)}
                      className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={15} /> เพิ่มสมาชิก
                    </button>
                    <button
                      onClick={() => openEditSection(section)}
                      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      title="แก้ไข Section"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      title="ลบ Section"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Members Grid */}
                <div className="p-6">
                  {section.members.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                      <UserCircle size={36} className="mx-auto mb-2 text-gray-300" strokeWidth={1} />
                      <p className="text-sm">ยังไม่มีสมาชิก</p>
                      <button
                        onClick={() => openAddMember(section.id)}
                        className="mt-2 text-blue-600 hover:underline text-xs flex items-center gap-1 mx-auto"
                      >
                        <Plus size={12} /> เพิ่มสมาชิก
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {groupByRow(section.members).map((row, rowIdx) => (
                        <div key={rowIdx} className="flex flex-wrap justify-center gap-6">
                          {row.slice(0, 2).map((member) => (
                            <div key={member.id} className="w-full sm:w-[calc(50%-12px)]">
                              <MemberCard
                                member={member}
                                onEdit={openEditMember}
                                onDelete={deleteMember}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Section Modal ─── */}
      <Modal open={sectionModal} onClose={() => setSectionModal(false)}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            {editSection?.id ? "แก้ไข Section" : "เพิ่ม Section"}
          </h2>
          <button
            onClick={() => setSectionModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ Section (ภาษาไทย) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น คณะกรรมการบริหาร"
              value={editSection?.name_th ?? ""}
              onChange={(e) => setEditSection((p) => ({ ...p, name_th: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ Section (ภาษาอังกฤษ)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Executive Committee"
              value={editSection?.name_en ?? ""}
              onChange={(e) => setEditSection((p) => ({ ...p, name_en: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ลำดับการแสดง (น้อย = แสดงก่อน)
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editSection?.rank ?? 0}
              onChange={(e) => setEditSection((p) => ({ ...p, rank: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setSectionModal(false)}
            className="px-4 py-2.5 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={saveSection}
            className="px-5 py-2.5 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            บันทึก
          </button>
        </div>
      </Modal>

      {/* ─── Member Modal ─── */}
      <Modal open={memberModal} onClose={() => setMemberModal(false)}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            {editMember?.id ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิก"}
          </h2>
          <button
            onClick={() => setMemberModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Image Section */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">รูปภาพ</label>

            {/* Mode Tabs */}
            <div className="flex gap-0 mb-3 border border-gray-200 rounded-lg overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium transition-colors ${imageMode === "upload"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Upload size={13} /> อัปโหลดไฟล์
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium transition-colors ${imageMode === "url"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Link2 size={13} /> ลิงก์รูปภาพ
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={40} className="text-gray-300" strokeWidth={1} />
                )}
              </div>

              <div className="flex-1">
                {imageMode === "upload" ? (
                  <>
                    <div
                      onClick={() => !uploading && fileRef.current?.click()}
                      className={`flex items-center gap-2 border border-dashed rounded-lg px-3 py-2.5 transition-colors ${uploading
                        ? "border-blue-300 bg-blue-50 cursor-not-allowed"
                        : "border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                        }`}
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                          <span className="text-sm text-blue-500">กำลังอัปโหลด...</span>
                        </>
                      ) : (
                        <>
                          <Camera size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {imagePreview ? "เปลี่ยนรูปภาพ" : "คลิกเพื่อเลือกรูปภาพ"}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">รองรับ JPG, PNG, WEBP · สูงสุด 5 MB</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploading} />
                  </>
                ) : (
                  <>
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={imageUrlInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setImageUrlInput(val);
                        setImagePreview(val || null);
                        setEditMember((p) => ({ ...p, image: val || null }));
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1">วางลิงก์รูปภาพจากอินเทอร์เน็ต</p>
                  </>
                )}

                {imagePreview && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="flex items-center gap-1 text-red-500 hover:underline text-xs mt-1"
                  >
                    <X size={11} /> ลบรูปภาพ
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">คำนำหน้า</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editMember?.title ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, title: e.target.value }))}
              >
                <option value="">-</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Assoc. Prof. Dr.">Assoc. Prof. Dr.</option>
                <option value="Asst. Prof. Dr.">Asst. Prof. Dr.</option>
                <option value="Prof. Dr.">Prof. Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ชื่อ"
                value={editMember?.first_name ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, first_name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="นามสกุล"
                value={editMember?.last_name ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, last_name: e.target.value }))}
              />
            </div>
          </div>

          {/* Position */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">ตำแหน่ง</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Chairman"
                value={editMember?.position_en ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, position_en: e.target.value }))}
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="02-xxx-xxxx"
                value={editMember?.phone ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">อีเมล</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                value={editMember?.email ?? ""}
                onChange={(e) => setEditMember((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
          </div>

          {/* Row / Col / Status */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                แถวที่ <span className="text-gray-400">(row)</span>
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditMember((p) => ({ ...p, row_order: Math.max(0, (p?.row_order ?? 0) - 1) }))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ChevronLeft size={14} />
                </button>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editMember?.row_order ?? 0}
                  onChange={(e) => setEditMember((p) => ({ ...p, row_order: Number(e.target.value) }))}
                />
                <button
                  type="button"
                  onClick={() => setEditMember((p) => ({ ...p, row_order: (p?.row_order ?? 0) + 1 }))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                คอลัมน์ <span className="text-gray-400">(0 หรือ 1)</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editMember?.col_order ?? 0}
                onChange={(e) => setEditMember((p) => ({ ...p, col_order: Number(e.target.value) }))}
              >
                <option value={0}>ซ้าย (0)</option>
                <option value={1}>ขวา (1)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">สถานะ</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editMember?.status ?? 1}
                onChange={(e) => setEditMember((p) => ({ ...p, status: Number(e.target.value) }))}
              >
                <option value={1}>แสดงผล</option>
                <option value={0}>ซ่อน</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setMemberModal(false)}
            className="px-4 py-2.5 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={saveMember}
            className="px-5 py-2.5 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            บันทึก
          </button>
        </div>
      </Modal>

      {/* ─── Confirm Dialog ─── */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}
