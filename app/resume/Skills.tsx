import Section from '../../components/Section';
import SkillSet from '../../components/SkillSet';

const skillSets = [
  {
    title: 'Full-Stack Development',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind',
      'Node.js',
      'GraphQL',
      'REST APIs',
    ],
  },
  {
    title: 'Design & UX',
    skills: [
      'UI/UX Design',
      'Figma',
      'Design Systems',
      'Responsive Design',
      'Animation',
    ],
  },
  {
    title: 'Mobile & Cross-Platform',
    skills: [
      'React Native',
      'TV App Development',
      'Cross-browser Compatibility',
    ],
  },
  {
    title: 'Testing & Quality',
    skills: [
      'Jest',
      'React Testing Library',
      'Storybook',
      'CI/CD',
      'Code Review',
    ],
  },
  {
    title: 'Development Practices',
    skills: ['Agile/Scrum', 'Git', 'Code Review', 'Documentation', 'Mentoring'],
  },
];

export default function Skills() {
  return (
    <Section title="Skills">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-x-8 md:px-4">
        {skillSets.map((skillSet) => (
          <SkillSet
            key={skillSet.title}
            title={skillSet.title}
            skills={skillSet.skills}
          />
        ))}
      </div>
    </Section>
  );
}
