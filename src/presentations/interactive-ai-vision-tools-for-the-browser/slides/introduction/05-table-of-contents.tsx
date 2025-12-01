import { IntelSlide as Slide } from "@/components/slides/slide";

import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

export function TableOfContents() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="What we will talk about" subtitle="Introduction" />}>
        <List>
          <ListItem className="mt-4">Introduction</ListItem>
          <List subList>
            <ListItem>Why we invested time on developing accurate annotation tools</ListItem>
          </List>
          <li className="mt-12">Smart tools with classical computer vision</li>
          <List subList>
            <ListItem>How to effectively use OpenCV in the browser</ListItem>
          </List>
          <ListItem className="mt-12">Smart tools based on Neural Networks</ListItem>
          <List subList>
            <ListItem>Local inference of neural networks in the browser</ListItem>
          </List>
          <ListItem className="mt-12">Looking ahead: emerging tech</ListItem>
          <List subList>
            <ListItem>What else is there to look forward to?</ListItem>
            <ListItem>Concluding remarks</ListItem>
          </List>
        </List>
      </Layout>
    </Slide>
  );
}
