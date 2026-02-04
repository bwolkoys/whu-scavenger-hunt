export default function SubmitPhotosPage() {
    return (
      <div className="min-h-screen bg-[#1BB1E7]">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-2xl font-bold text-white">Submit Your Photos</h1>
          <p className="mt-2 text-white/90">
            Upload your team’s photos below. When you’re done, submit the form.
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
  