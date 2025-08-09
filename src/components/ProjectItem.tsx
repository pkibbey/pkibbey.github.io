import { Badge } from "@/components/ui/badge"

export interface Project {
  title: string
  url: string
  description: string
  tags: string[]
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="p-6 rounded-lg border shadow-xs hover:shadow-md transition-shadow duration-300">
      <h3 className="typography-heading-6">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {project.title}
          <span className="sr-only"> — external link</span>
        </a>
      </h3>
      <p className="typography-small mt-2">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <Badge key={tag} variant="outline" className="font-mono">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
