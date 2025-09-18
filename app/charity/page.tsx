import ThankYouLetterStandaloneEditor from "@/components/ThankYouLetterStandaloneEditor";
import { Heart } from "lucide-react";

export default function CharityPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Thư cảm ơn NTT</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ThankYouLetterStandaloneEditor />
      </main>
    </>
  );
}
