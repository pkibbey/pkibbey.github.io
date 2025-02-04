import Introduction from './Introduction';
import NotableWorks from './NotableWorks';
import Skills from './Skills';
import WorkExperience from './WorkExperience';
import SidebarNav from '../../components/SidebarNav';
import Link from 'next/link';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'notable-work', title: 'Notable Work' },
  { id: 'download', title: 'Download' },
];

export default function ResumePage() {
  return (
    <div className="relative">
      <div>
        <div id="introduction">
          <Introduction />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="experience">
          <WorkExperience />
        </div>
        <div id="notable-work">
          <NotableWorks />
        </div>
        <div id="download" className="mt-8">
          <h2 className="heading-2 mb-4">Download</h2>
          <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-200">
            My resume can be{' '}
            <Link
              href="/resume.pdf"
              passHref
              download="Phineas Kibbey - Resume"
            >
              downloaded as a PDF
            </Link>
            . Contact details are in the header of the resume.
          </p>
        </div>
      </div>
      <SidebarNav sections={sections} />
    </div>
  );
}
