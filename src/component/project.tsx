import { ExternalLink } from "lucide-react";
import { Badge } from "./badge";
import { Card } from "./card";
import { Container } from "./container";
import { FadeIn } from "./fadeIn";
import { PlaceholderImage } from "./placeHolderImage";
import { SectionTitle } from "./sectionTitle";
import { Project } from "./types";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (<Container>
    <SectionTitle eyebrow="Selected Work" title="Projects" subtitle="A few things I've shipped recently." />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, idx) => (
        <FadeIn key={idx} delay={idx * 0.05}>
          <Card className="flex h-full flex-col">
            <PlaceholderImage />
            <div className="mt-4 flex flex-1 flex-col">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-300">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s, i) => (
                  <Badge key={i}>{s}</Badge>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href={p.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                >
                  View project <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </FadeIn>
      ))}
    </div>
  </Container>)
};