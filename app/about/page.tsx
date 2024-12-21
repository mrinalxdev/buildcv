import Image from "next/image";

export default function SimpleSaasPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">BuildCV</h1>

      <Image
        src="/feature3.png"
        alt="TaskMaster Dashboard"
        width={600}
        height={400}
        className="w-full h-auto rounded-lg shadow-lg mb-8"
      />

      <div className="space-y-6 text-lg">
        <p>
          Our platform provides a visual node-editor interface that simplifies
          the process of building custom OpenCV algorithms. By connecting
          pre-built blocks (nodes), users can create powerful image processing
          pipelines with minimal coding. The platform supports real-time
          previews, dynamic parameter adjustments, and seamless integration of
          multiple algorithmic steps.
        </p>
      </div>
    </div>
  );
}
