import Image from "next/image";
import Background from "@/assets/donnor-letter/charity-bg.webp";
import FooterRight from "@/assets/donnor-letter/footer-right.png";
import LeaderSign from "@/assets/sign.png";
import FireLogo from "@/assets/donnor-letter/fire-logo.webp";
import SmLogo from "@/assets/donnor-letter/sm-logo.webp";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { forwardRef } from "react";

const montserrat = localFont({
  src: "../assets/font/vnf-caviar.ttf",
  display: "swap",
  weight: "400",
});
const baloo = localFont({
  src: "../assets/font/iCielNabila.ttf",
  display: "swap",
  weight: "400",
});

interface ThankYouLetterDonnorProps {
  name?: string;
  description1?: string;
  description2?: string;
}

const ThankYouLetterDonnor = forwardRef<HTMLDivElement, ThankYouLetterDonnorProps>(
  (
    {
      name = "Easy Trip",
      description1 = "<p>Đã tham gia đóng góp tài trợ <strong>4.000.000 VND</strong> xây dựng Điểm trường Huổi Meo 2 (Pú Vang)- Tiểu học số 2 Mường Mươn, huyện Mường Chà, tỉnh Điện Biên vào ngày 04/08/2025.</p>",
      description2 = "<p>Sự đồng hành của Bạn đã chung tay góp sức dựng trường đưa em tới lớp, mở đường ước mơ cho các em học sinh dân tộc thiểu số khó khăn.</p>",
    },
    ref
  ) => {
    return (
      <div
        className={`relative w-[1100px]  mx-auto overflow-hidden bg-white certificate-template 
        shadow-lg border border-gray-200`}
        style={{
          aspectRatio: "5097/3600",
          minHeight: "clamp(400px, 60vw, 800px)",
          maxHeight: "90vh",
          backgroundImage: `url(${Background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        ref={ref}
      >
        <div className="h-full relative overflow-auto flex flex-col gap-6">
          <div className="flex-shrink-0">
            <div className="mx-auto flex justify-center items-center">
              <Image src={SmLogo.src} alt="sm-logo" className="object-cover" width={120} height={120} />
              <Image src={FireLogo.src} alt="Fire Logo" className="object-cover h-20" width={80} height={80} />
            </div>

            <div className={cn("text-center mb-2 space-y-2")}>
              <h2 className={cn("text-[#ff1616] font-bold text-3xl", montserrat.className)}>DỰ ÁN NUÔI EM - DỰ ÁN SỨC MẠNH 2000</h2>
              <h1 className={cn("text-[#436089] font-bold text-4xl", baloo.className)}>TRÂN TRỌNG CẢM ƠN</h1>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center px-4">
            {/* name */}
            <ResizableBox width={800} height={80} minConstraints={[300, 60]} maxConstraints={[1000, 200]} resizeHandles={["se"]} className="resizable-text-box mb-8">
              <div className={cn("h-full w-full rounded-lg overflow-auto resize-none resizable-content flex items-center justify-center", montserrat.className)}>
                <div dangerouslySetInnerHTML={{ __html: name }} className="text-6xl font-bold text-center whitespace-pre-wrap rich-text-content ql-editor reset-quill-editor-style" />
              </div>
            </ResizableBox>

            <ResizableBox width={800} height={120} minConstraints={[300, 60]} maxConstraints={[1000, 300]} resizeHandles={["se"]} className="mb-4 resizable-text-box">
              <div className={cn("space-y-2 h-full w-full text-xl rounded-lg overflow-auto resize-none resizable-content", montserrat.className)}>
                <div dangerouslySetInnerHTML={{ __html: description1 }} className="rich-text-content ql-editor reset-quill-editor-style h-full" />
              </div>
            </ResizableBox>

            <ResizableBox width={800} height={80} minConstraints={[300, 60]} maxConstraints={[1000, 300]} resizeHandles={["se"]} className="resizable-text-box">
              <div className={cn("space-y-2 h-full w-full text-xl rounded-lg overflow-auto resize-none resizable-content", montserrat.className)}>
                <div dangerouslySetInnerHTML={{ __html: description2 }} className="rich-text-content ql-editor reset-quill-editor-style h-full" />
              </div>
            </ResizableBox>
          </div>

          <div className={cn("flex-grow flex justify-end items-end mb-5 font-bold mr-2", montserrat.className)}>
            <div className="flex flex-col items-center text-base">
              <div className="text-center">
                <p>TM. Dự án Nuôi Em - Dự án Sức mạnh 2000</p>
                <p>Chủ nhiệm</p>
              </div>
              <Image src={LeaderSign.src} alt="Seal" width={200} height={150} />
              <p className=" mt-2">Hoàng Hoa Trung</p>
            </div>
            <Image alt="footer-right-bottom" className="mt-5" src={FooterRight.src} width={200} height={200} />
          </div>
        </div>
      </div>
    );
  }
);
ThankYouLetterDonnor.displayName = "ThankYouLetterDonnor";

export default ThankYouLetterDonnor;
