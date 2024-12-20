const FeatureBento = () => {
  return (
    <div className="py-5">
      <div className="lg:flex justify-center w-full gap-4 block">
        <div className="w-full px-4 pb-4">
          <div className="bg-black w-full h-full rounded-[20px] p-6 shadow-md hover:shadow-2xl">
            <h1 className="text-gray-100 text-2xl lg:text-4xl">
              Loads of{" "}
              <span className="font-title text-gray-300 italic">
                Algorithms
              </span>{" "}
            </h1>

            <p className="text-white pt-5 text-sm">
              Preset algorithms like Gaussian Blur, Grayscale, Threshold, and
              Edge Detection empower you to build your own computer vision
              algorithm. Simply adjust the values, and you're good to go with
              your image!
            </p>

            <img src="/feature1.png" alt="" className="pt-6 rounded-b-[20px]" />
          </div>
        </div>

        <div className="w-full px-4 pb-4">
          <div className=" w-full h-full rounded-[20px] p-6 border border-black shadow-md hover:shadow-2xl">
            <h1 className="text-black text-2xl lg:text-4xl">
              Visualize Your{" "}
              <span className="font-title text-purple-500 font-semibold italic">
                Results
              </span>{" "}
            </h1>

            <p className="text-black pt-5 text-sm pb-5">
              See your algorithms in action with our interactive visualisation tool. Get instant feedback on how your adjustments affect the output, and refine your algorithm with ease. 
            </p>

            <img src="/feature3.png" alt="" className="rounded-b-[20px] border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBento;
