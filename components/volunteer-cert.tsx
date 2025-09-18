import { CertificateData } from "@/types/certificate";
import { forwardRef } from "react";
import BackgroundImage from "@/assets/background.png"; // Adjust the path as necessary
import Image from "next/image";
import LeaderSign from "@/assets/sign.png";
import Leader from "@/assets/leader.png";
import Banner from "@/assets/banner.png";
import LogoBottom from "@/assets/img-bottom.svg";
import { cn, converDateToVietnameseFormat } from "@/lib/utils";
import localFont from "next/font/local";

const iCielNabila = localFont({
  src: "../assets/font/iCielNabila.ttf",
});
const vnfCaviar = localFont({
  src: "../assets/font/vnf-caviar.ttf",
  display: "swap",
  weight: "400",
});
const openSans = localFont({
  src: "../assets/font/vnf-caviar.ttf", // Using local font instead of Google Fonts
  display: "swap",
  weight: "400",
});

interface VolunteerCertificateTemplateProps {
  data: CertificateData;
  index: number;
  className?: string;
}

const VolunteerCertificateTemplate = forwardRef<HTMLDivElement, VolunteerCertificateTemplateProps>(({ data, index }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-[1100px] min-h-[750px] mx-auto overflow-hidden bg-white certificate-template shadow-lg border border-gray-200")}
      style={{
        aspectRatio: "5097/3600",
        minHeight: "clamp(400px, 60vw, 800px)",
        maxHeight: "90vh",
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full relative overflow-auto flex flex-col px-16 pt-0 py-8">
        <div className="flex-shrink-0">
          <div className="w-full mx-auto">
            <Image src={Banner.src} alt="Banner" className="w-full object-cover" width={200} height={100} />
          </div>

          <div className="text-center mb-2">
            <h2 className="text-[#9b4e42] font-black text-sm sm:text-base md:text-lg lg:text-xl" style={{ fontWeight: 700 }}>
              HỆ SINH THÁI NUÔI EM XÁC NHẬN
            </h2>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center px-4 mb-4">
          <p
            className={cn(iCielNabila.className, "text-[#923137] px-4")}
            style={{
              fontSize: "4rem",
            }}
          >
            {data.name}
          </p>

          <div className="mb-2">
            <p className={cn("text-black text-xl my-2", openSans.className)}>Sinh {converDateToVietnameseFormat(data.dob)}</p>
          </div>

          <div className="mb-4">
            <div className={cn("text-[#923137] text-2xl space-y-2", iCielNabila.className)}>
              <p>Đã tham gia là tình nguyện viên hỗ trợ Dự án Nuôi Em</p>
              <p>
                Từ tháng {data.time_join} đến tháng {data.time_leave}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-grow items-end justify-between px-48 pb-8 relative">
          {/* Left side - Certificate number and logo */}
          <div className="flex flex-col items-center flex-shrink-0 pb-10">
            <div className="text-center">
              <p className={cn("text-black text-xl my-2", openSans.className)}>Số: {data.certificateNumber || index || 100} / HSTNE</p>
            </div>
            <Image alt="logo-bottom" src={LogoBottom.src} width={160} height={160} className="object-contain" />
          </div>

          {/* Right side - Date, group, signature and stamp */}
          <div className="absolute bottom-9 left-3/4 transform -translate-x-1/2">
            <div className="text-center">
              <p className="text-black font-bold text-sm">Hà Nội, ngày {data.issuedDate || "10/02/2025"}</p>
              <p className="text-black font-bold text-base">Nhóm tình nguyện Niềm Tin</p>
            </div>

            <Image src={LeaderSign.src} alt="Seal" width={200} height={150} style={{ marginTop: "-24px" }} />

            <div className="text-center">
              <p className="text-black font-bold text-sm">Trưởng nhóm</p>
              <p className="text-black font-bold text-base">HOÀNG HOA TRUNG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

VolunteerCertificateTemplate.displayName = "VolunteerCertificateTemplate";

export default VolunteerCertificateTemplate;
