"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Download, AlertCircle } from "lucide-react";
import { parseCSV, downloadSampleCSV, ParseResult } from "@/lib/csv-parser";
import { CertificateData } from "@/types/certificate";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CsvUploaderProps {
  onDataLoaded: (data: CertificateData[]) => void;
}

export default function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsProcessing(true);
      setErrors([]);
      setUploadedFile(file.name);

      try {
        const result: ParseResult = await parseCSV(file);

        if (result.errors.length > 0) {
          setErrors(result.errors);
        }

        if (result.data.length > 0) {
          onDataLoaded(result.data);
        }
      } catch (error) {
        setErrors(["Failed to process CSV file. Please check the format and try again."]);
      } finally {
        setIsProcessing(false);
      }
    },
    [onDataLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxFiles: 1,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Tải lên dữ liệu chứng chỉ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-teal-500 bg-teal-50" : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"} ${
            isProcessing ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />

          {isProcessing ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold">Đang xử lý file CSV...</p>
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-semibold">{isDragActive ? "Thả file CSV vào đây" : "Kéo thả file CSV vào đây, hoặc nhấp để duyệt"}</p>
              <p className="text-sm text-gray-500">Hỗ trợ file CSV với các cột: name, dob, time_join, time_leave</p>
              {uploadedFile && <p className="text-sm text-green-600 font-medium">Lần tải lên cuối: {uploadedFile}</p>}
            </div>
          )}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="font-semibold mb-2">Tìm thấy {errors.length} lỗi:</div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Sample Download */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <h3 className="font-semibold text-blue-900">Cần file CSV mẫu?</h3>
            <p className="text-sm text-blue-700">Tải xuống file mẫu để xem định dạng đúng</p>
          </div>
          <Button variant="outline" onClick={downloadSampleCSV} className="border-blue-300 text-blue-700 hover:bg-blue-100">
            <Download className="w-4 h-4 mr-2" />
            File CSV mẫu
          </Button>
        </div>

        {/* File Format Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Định dạng CSV mong đợi:</h3>
          <div className="text-sm text-gray-600 font-mono bg-white p-3 rounded border">
            name,dob,time_join,time_leave
            <br />
            Nguyễn Văn A,01/01/1995,09/2024,05/2025
            <br />
            Trần Thị B,15/03/1998,09/2024,05/2025
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
