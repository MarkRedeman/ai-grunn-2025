<div align="center">
  <p>
    <a align="center" href="https://docs.geti.intel.com/">
      <img width="100%" src="/src/assets/aigrunn/readme-header.png" />
    </a>
  </p>
</div>

# Building interactive AI vision tools for the browser

In this talk we show how we developed AI vision tools that can be used to draw bounding boxes or segmentation masks on users' vision datasets.
These annotation tools run locally in the browser without any server communication.

We first review some classical annotation tools that we implemented for Intel Geti based on classical computer vision using OpenCV.

Then we dive into integrating ONNXRuntime which we used to implement interactive auto segmentation tools such as Meta's Segment Anything Model (SAM).
We will cover some implementation details such as the encoder/decoder strategies, pre processing (image resizing, color normalization) and post processing steps.

Some practical optimization tips will be shared such as using WebWorkers, choosing the right encoder model and efficiently computing the post processing steps for high resolution images.
Looking ahead we discuss emerging technologies like WebGPU and WebNN that allows us to perform inference outside of the CPU.


## About the slides

<!-- If all you have is a hammer, everything looks like a nail -->

> [!IMPORTANT]
> While I've tried to clean up the code of the slides, the code itself is not production ready. It generally lacks error handling as the primary use case of the code is to be used when presenting this talk.
> Please checkout Geti's [codebase](https://github.com/open-edge-platform/geti/tree/main/web_ui) if you're interested in seeing the code we use in production.

These slides were made in React, using [Spectacle](https://nearform.com/open-source/spectacle/docs/). My goal for these slides was that they are interactive and less boring than a plain powerpoint or google slides deck.

The code for these slides borrow concepts from [Geti's Web UI code](https://github.com/open-edge-platform/geti/tree/main/web_ui).

The [Using OpenCV to implement Grabcut](/building-interactive-ai-vision-tools-for-the-browser/interactive-grabcut-demo) and [SAM demo](/building-interactive-ai-vision-tools-for-the-browser/interactive-sam-demo) slides use our custom compiled OpenCV js code as well as ONNXRuntime to run AI models in the browser.


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
