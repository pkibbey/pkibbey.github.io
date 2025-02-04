import Section from '../../components/Section';
import Highlight from '../../components/Highlight';
import NotableWork from '../../components/NotableWork';

export default function NotableWorks() {
  return (
    <Section title="Notable Works">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 mb-12">
        <NotableWork
          imageProps={{ src: '/work/qualcomm.jpg' }}
          title="Qualcomm Website Redesign"
          href="https://www.qualcomm.com"
        >
          <p>
            Complete redesign for a global technology brand{' '}
            <Highlight>Qualcomm</Highlight>.
          </p>
        </NotableWork>

        <NotableWork
          imageProps={{ src: '/work/lennd.png' }}
          title="Lennd Event Platform"
          href="https://www.lennd.com"
        >
          <p>
            React and React Native app for the event management platform{' '}
            <Highlight>Lennd</Highlight>.
          </p>
        </NotableWork>

        <NotableWork
          imageProps={{ src: '/work/monocle.jpg' }}
          title="Monocle Magazine"
          href="https://www.monocle.com"
        >
          <p>
            Responsive design for the global design magazine{' '}
            <Highlight>Monocle</Highlight>.
          </p>
        </NotableWork>
      </div>
    </Section>
  );
}
