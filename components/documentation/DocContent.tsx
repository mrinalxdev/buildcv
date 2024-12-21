"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DocsContent({ sectionRefs }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <section
        id="introduction"
        ref={(el) => (sectionRefs.current.introduction = el)}
        className="scroll-mt-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          BuildCV{" "}
          <span className="text-purple-500 font-title underline underline-offset-4">
            Documentation
          </span>
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our platform provides a visual node-editor interface that simplifies
          the process of building custom OpenCV algorithms. By connecting
          pre-built blocks (nodes), users can create powerful image processing
          pipelines with minimal coding. The platform supports real-time
          previews, dynamic parameter adjustments, and seamless integration of
          multiple algorithmic steps.
        </p>
      </section>

      <section
        id="getting-started"
        ref={(el) => (sectionRefs.current["getting-started"] = el)}
        className="scroll-mt-16 space-y-8"
      >
        <h2 className="text-3xl font-semibold font-title mb-6">
          Getting Started
        </h2>

        {[
          {
            title: "1. Image URL",
            content: [
              {
                label: "Purpose",
                text: "Accepts Image URL as the starting point for the pipeline",
              },
              { label: "Inputs", text: "None (initial Node)" },
              { label: "Output", text: "Original Image" },
            ],
          },
          {
            title: "2. Preview Grayscale",
            content: [
              {
                label: "Purpose",
                text: "Converts the input image to grayscale.",
              },
              { label: "Inputs", text: "Original image." },
              { label: "Outputs", text: "Grayscale image." },
              { label: "UI Elements", text: "None (conversion is automatic)." },
              { label: "Preview", text: "Displays the grayscale image." },
            ],
          },
          {
            title: "3. Gaussian Blur",
            content: [
              {
                label: "Purpose",
                text: "Applies Gaussian blur to smooth the input image.",
              },
              { label: "Inputs", text: "Grayscale or original image." },
              {
                label: "Parameters",
                text: "Kernel Size (3x3, 5x5, etc.), Sigma (intensity of blur)",
              },
              { label: "Outputs", text: "Blurred image." },
              {
                label: "UI Elements",
                text: "Dropdown for kernel size, Slider or input field for sigma value.",
              },
              { label: "Preview", text: "Displays the blurred image." },
            ],
          },
          {
            title: "4. Threshold",
            content: [
              {
                label: "Purpose",
                text: "Applies a thresholding operation to the input image.",
              },
              { label: "Inputs", text: "Grayscale image." },
              {
                label: "Parameters",
                text: "Threshold Value, Maximum Value, Type (BINARY, BINARY_INV, TRUNC, TOZERO, TOZERO_INV)",
              },
              { label: "Outputs", text: "Thresholded image." },
              {
                label: "UI Elements",
                text: "Slider or input field for threshold and max values, Dropdown for threshold type.",
              },
              { label: "Preview", text: "Displays the thresholded image." },
            ],
          },
          {
            title: "5. Edge Detection",
            content: [
              {
                label: "Purpose",
                text: "Detects edges in the input image using selected methods.",
              },
              { label: "Inputs", text: "Grayscale or processed image." },
              {
                label: "Parameters",
                text: "Method (Sobel, Canny), Threshold1 (lower), Threshold2 (upper)",
              },
              { label: "Outputs", text: "Edge-detected image." },
              {
                label: "UI Elements",
                text: "Dropdown for method, Sliders or input fields for thresholds.",
              },
              { label: "Preview", text: "Displays the edge-detected image." },
            ],
          },
          {
            title: "6. Output",
            content: [
              {
                label: "Purpose",
                text: "Provides the final processed image for download or further use.",
              },
              { label: "Inputs", text: "Any processed image." },
              { label: "Outputs", text: "None (end of pipeline)." },
              { label: "UI Elements", text: "Download button." },
              { label: "Preview", text: "Displays the final image." },
            ],
          },
        ].map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span className="font-semibold">{item.label}</span>:{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <hr />

      <section
        id="build-workflow"
        ref={(el) => (sectionRefs.current["build-workflow"] = el)}
        className="scroll-mt-16 space-y-8"
      >
        <h2 className="text-3xl font-semibold font-title mb-6">
          Building a Workflow
        </h2>

        {[
          {
            title: "Input",
            content: [
              "Drag the Input Image URL node onto the canvas.",
              "Enter the image URL or upload a file to initialize the pipeline.",
            ],
          },
          {
            title: "Add Processing Nodes",
            content: [
              "Connect the output of the Input Image URL node to a Preview Grayscale node.",
              "Add a Gaussian Blur node and configure parameters:",
              "- Kernel size",
              "- Sigma",
              "Insert a Threshold node to apply a binary threshold.",
              "Use an Edge Detection node to highlight edges with methods like Sobel or Canny.",
            ],
          },
          {
            title: "Finalize with Output",
            content: [
              "Connect the last processing node to the Output node.",
              "Preview and download the final image.",
            ],
          },
        ].map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
