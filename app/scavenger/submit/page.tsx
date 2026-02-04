import Link from "next/link";

export default function SubmitPhotosPage() {
    return (
      <div className="min-h-screen bg-[#1BB1E7]">

<div className="p-4 flex flex-wrap justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-black/40 px-4 py-2 text-sm font-semibold text-white hover:bg-black/60 transition"
        >
          ← Back
        </Link>
      </div>

        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-2xl font-bold text-white">Submit Your Photos</h1>
          <p className="mt-2 text-white/90">
            Upload your team’s photos below, one photo per checklist item. When you’re done, submit the form!
          </p>
  
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/25 bg-white">
            <iframe
              className="airtable-embed w-full"
              src="https://airtable.com/embed/appegpE7zvT7aotvm/pagT6CbV2bE5zgRiv/form"
              width="100%"
              height="700"
              style={{ background: "transparent", border: "0" }}
            />
          </div>
        </div>
      </div>
    );
  }
  