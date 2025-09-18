"use client";

import { useState } from "react";
import { CertificateData } from "@/types/certificate";
import CsvUploader from "@/components/CsvUploader";
import CertificateEditor from "@/components/CertificateEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft } from "lucide-react";

enum AppState {
  UPLOAD,
  EDIT,
}

export default function VolunteerPage() {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);

  const handleDataLoaded = (data: CertificateData[]) => {
    setCertificates(data);
    if (data.length > 0) {
      setAppState(AppState.EDIT);
    }
  };

  const handleUpdateCertificate = (id: string, updates: Partial<CertificateData>) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)));
  };

  const resetApp = () => {
    setAppState(AppState.UPLOAD);
    setCertificates([]);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Giấy chứng nhận TNV</h1>
              </div>

              {certificates.length > 0 && (
                <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                  {certificates.length} giấy chứng nhận
                </Badge>
              )}
            </div>

            {appState === AppState.EDIT && (
              <Button variant="outline" onClick={resetApp} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Tải lên mới</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appState === AppState.UPLOAD ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Trình tạo Giấy chứng nhận TNV</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tạo giấy chứng nhận cho các tình nguyện viên đã tham gia vào các dự án phục vụ cộng đồng. Tải lên file CSV với dữ liệu người tham gia để tự động tạo giấy chứng nhận cá nhân hóa.
              </p>
            </div>

            {/* CSV Uploader */}
            <CsvUploader onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <CertificateEditor certificates={certificates} onUpdateCertificate={handleUpdateCertificate} />
        )}
      </main>
    </>
  );
}
