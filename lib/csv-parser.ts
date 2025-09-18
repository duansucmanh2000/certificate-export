import Papa from "papaparse";
import { CsvRow, CertificateData } from "@/types/certificate";

export interface ParseResult {
  data: CertificateData[];
  errors: string[];
}

export const parseCSV = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const data: CertificateData[] = [];

        results.data.forEach((row: any, index: number) => {
          const csvRow = row as CsvRow;

          // Validate required fields
          if (!csvRow.name?.trim()) {
            errors.push(`Row ${index + 1}: Name is required`);
            return;
          }

          if (!csvRow.dob?.trim()) {
            errors.push(`Row ${index + 1}: Date of birth is required`);
            return;
          }

          if (!csvRow.time_join?.trim()) {
            errors.push(`Row ${index + 1}: Join time is required`);
            return;
          }

          if (!csvRow.time_leave?.trim()) {
            errors.push(`Row ${index + 1}: Leave time is required`);
            return;
          }

          data.push({
            id: `cert-${Date.now()}-${index}`,
            name: csvRow.name.trim(),
            dob: csvRow.dob.trim(),
            time_join: csvRow.time_join.trim(),
            time_leave: csvRow.time_leave.trim(),
            issuedDate: new Date().toLocaleDateString("vi-VN"),
            issuerName: "Nhóm tình nguyện Niềm Tin",
            organizationName: "HOÀNG HÒA TRUNG",
            // Optional thank-you letter fields
            donationAmount: csvRow.donationAmount?.trim() || "",
            description1: csvRow.description1?.trim() || "",
            description2: csvRow.description2?.trim() || "",
          });
        });

        resolve({ data, errors });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [`Failed to parse CSV: ${error.message}`],
        });
      },
    });
  });
};

export const downloadSampleCSV = () => {
  const sampleData = [
    {
      name: "Nguyễn Văn A",
      dob: "01/01/1995",
      time_join: "09/2024",
      time_leave: "05/2025",
    },
    {
      name: "Trần Thị B",
      dob: "15/03/1998",
      time_join: "09/2024",
      time_leave: "05/2025",
    },
    {
      name: "Lê Văn C",
      dob: "20/07/1997",
      time_join: "09/2024",
      time_leave: "05/2025",
    },
  ];

  const csv = Papa.unparse(sampleData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "sample-certificates.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
