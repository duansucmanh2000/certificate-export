import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import React from "react";
import JSZip from "jszip";
import { CertificateData } from "@/types/certificate";
import VolunteerCertificate from "@/components/volunteer-cert";
import ThankYouLetterDonnor from "@/components/thank-you-letter-dornor";
import { ThankYouData } from "@/components/ThankYouLetterStandaloneEditor";

export const exportToPDF = async (
  certificate: CertificateData,
  index: number
) => {
  try {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const certificateHTML = renderToString(
      React.createElement(VolunteerCertificate, { data: certificate, index })
    );

    const imageData = await convertToImage(certificateHTML);
    pdf.addImage(imageData, "PNG", 0, 0, 297, 210);

    // Save the PDF
    const filename = `certificate-${certificate.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting PDF:", error);
    throw new Error("Failed to export PDF. Please try again.");
  }
};

export const exportAllToPDF = async (certificates: CertificateData[]) => {
  try {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < certificates.length; i++) {
      const certificate = certificates[i];
      const certificateHTML = renderToString(
        React.createElement(VolunteerCertificate, {
          data: certificate,
          index: i + 1,
        })
      );

      const imgData = await convertToImage(certificateHTML);

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    }

    const filename = `all-certificates-${Date.now()}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting all PDFs:", error);
    throw new Error("Failed to export all PDFs. Please try again.");
  }
};

export const exportEachCertificateAsSeparatePDF = async (
  certificates: CertificateData[]
) => {
  try {
    const zip = new JSZip();
    const pdfPromises = certificates.map(async (certificate, index) => {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const certificateHTML = renderToString(
        React.createElement(VolunteerCertificate, {
          data: certificate,
          index: index + 1,
        })
      );

      const imgData = await convertToImage(certificateHTML);
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

      const filename = `certificate-${slugify(certificate.name)}-${
        index + 1
      }.pdf`;
      const pdfBlob = pdf.output("blob");
      zip.file(filename, pdfBlob);
    });

    // Wait for all PDFs to be generated and added to ZIP
    await Promise.all(pdfPromises);

    // Generate ZIP file and download
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipFilename = `certificates-${Date.now()}.zip`;

    // Create download link
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = zipFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(
      `Successfully exported ${certificates.length} certificates in ZIP file: ${zipFilename}`
    );
  } catch (error) {
    console.error("Error exporting certificates as ZIP:", error);
    throw new Error("Failed to export certificates as ZIP. Please try again.");
  }
};

const convertToImage = async (htmlString: string) => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.backgroundColor = "white";
  container.style.fontFamily = "Times New Roman, serif";

  container.innerHTML = htmlString;

  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: container.getBoundingClientRect().width,
    height: container.getBoundingClientRect().height,
  });

  document.body.removeChild(container);

  return canvas.toDataURL("image/png");
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/[\s-]+/g, "-") // Replace spaces and hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from both ends
};
export const exportThankYouLetterToPDF = async (data: ThankYouData) => {
  try {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const letterHTML = renderToString(
      React.createElement(ThankYouLetterDonnor, { ...data })
    );

    const imgData = await convertToImage(letterHTML);

    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

    const filename = `thank-you-letter-${slugify(data.name)}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting thank you letter PDF:", error);
    throw new Error("Failed to export thank you letter PDF. Please try again.");
  }
};

export const exportThankYouLetterToPDFFromAnElement = async (
  name: string,
  element: HTMLElement
) => {
  try {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const imgData = await converHTMLElementToImage(element);
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    const filename = `thank-you-letter-${slugify(name)}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting thank you letter PDF:", error);
    throw new Error("Failed to export thank you letter PDF. Please try again.");
  }
};

export const converHTMLElementToImage = async (element: HTMLElement) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: element.getBoundingClientRect().width,
      height: element.getBoundingClientRect().height,
    });
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error converting HTML element to image:", error);
    throw new Error(
      "Failed to convert HTML element to image. Please try again."
    );
  }
};
