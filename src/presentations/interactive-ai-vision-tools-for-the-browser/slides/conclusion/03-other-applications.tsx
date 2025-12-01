import { IntelSlide as Slide } from "@/components/slides/slide";

import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

export function OtherApplications() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Other applications" subtitle="Concluding remarks" />}>
        <List>
          <ListItem>Active learning & dataset creation</ListItem>
          <List subList className="ml-8">
            <ListItem subItem>Auto-segment hard cases and let humans refine</ListItem>
            <ListItem subItem>Save money on expensive labeling tasks</ListItem>
          </List>
          <ListItem>Medical imaging</ListItem>
          <List subList className="ml-8">
            <ListItem subItem>Ongoing research in fine tuned SAM models for medical use cases</ListItem>
          </List>
          <ListItem>Automatic background removal</ListItem>
          <List subList className="ml-8">
            <ListItem>Photos of products on an e-commerce website</ListItem>
            <ListItem>Background blur for video conferencing</ListItem>
            <ListItem>Green screen replacements</ListItem>
          </List>
          <ListItem>Visual search</ListItem>
          <List subList className="ml-8">
            <ListItem>Pre-compute embeddings to find similar images</ListItem>
          </List>
          <ListItem>Accessibility</ListItem>
          <List subList className="ml-8">
            <ListItem>Combine with OCR or LLMs to explain objects in images</ListItem>
          </List>
        </List>
      </Layout>
    </Slide>
  );
}
