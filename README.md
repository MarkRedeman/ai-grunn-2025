<div align="center">
  <p>
    <a align="center" href="http://ai-grunn-2025.markredeman.nl/">
      <img width="100%" src="/screenshots/readme-header.png" />
    </a>
  </p>
</div>

# Building interactive AI vision tools for the browser

In this talk we show how we developed AI vision tools that can be used to draw bounding boxes or segmentation masks on users' vision datasets.
These annotation tools run locally in the browser without any server communication.

We first review some classical annotation tools that we implemented for [Intel Geti](https://docs.geti.intel.com/) based on classical computer vision using [OpenCV](https://opencv.org/).

Then we dive into integrating [ONNXRuntime](https://github.com/microsoft/onnxruntime) which we used to implement interactive auto segmentation tools such as Meta's [Segment Anything Model (SAM)](https://aidemos.meta.com/segment-anything/).
We will cover some implementation details such as the encoder/decoder strategies, pre processing (image resizing, color normalization) and post processing steps.

Some practical optimization tips will be shared such as using [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), choosing the right encoder model and efficiently computing the post processing steps for high resolution images.
Looking ahead we discuss emerging technologies like [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) and [WebNN](https://webnn.io/) that allows us to perform inference outside of the CPU.

| <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=0&stepIndex=0"><img width="100%" src="/screenshots/title.png" /></a>            | <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=1&stepIndex=0"><img width="100%" src="/screenshots/build-ai.png" /></a>            | <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=11&stepIndex=6"><img width="100%" src="/screenshots/grabcut-demo.png" /></a> |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=13&stepIndex=4"><img width="100%" src="/screenshots/opencv-smart-tools-overview.png" /></a> | <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=21&stepIndex=6"><img width="100%" src="/screenshots/sam-pre-processing.png" /></a> | <a align="center" href="https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser?slideIndex=26&stepIndex=0"><img width="100%" src="/screenshots/sam-demo.png" /></a>     |



## About the slides

<!-- If all you have is a hammer, everything looks like a nail -->

> [!IMPORTANT]
> While I've tried to clean up the code of the slides, the code itself is not production ready. It generally lacks error handling as the primary use case of the code is to be used when presenting this talk.
> Please checkout Geti's [codebase](https://github.com/open-edge-platform/geti/tree/main/web_ui) if you're interested in seeing the code we use in production.

These slides were made in React, using [Spectacle](https://nearform.com/open-source/spectacle/docs/). My goal for these slides was that they are interactive and less boring than a plain powerpoint or google slides deck.

The code for these slides borrow concepts from [Geti's Web UI code](https://github.com/open-edge-platform/geti/tree/main/web_ui).

The [Using OpenCV to implement Grabcut](https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser/interactive-grabcut-demo) and [SAM demo](https://ai-grunn-2025.markredeman.nl/building-interactive-ai-vision-tools-for-the-browser/interactive-sam-demo) slides use our custom compiled OpenCV js code as well as ONNXRuntime to run AI models in the browser.


## Train your own AI vision models with Geti


<div align="center">
  <p>
    <a align="center" href="https://docs.geti.intel.com/">
      <img
        width="120%"
        src="https://github.com/user-attachments/assets/9faee9f9-8c04-4287-8302-6b9d8c8675fe" />
    </a>
  </p>
</div>

The tools shown in this presentation were originally developed for [Geti](https://github.com/open-edge-platform/geti).
If your team is looking into training custom AI vision models then have a look at [our github](https://github.com/open-edge-platform/geti) or [our docs](https://docs.geti.intel.com/) and deploy Geti for free on your own hardware.
