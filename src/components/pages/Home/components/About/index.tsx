import { Dispatch, FC, SetStateAction } from 'react';
import { Typewriter } from '@components/ui';

import styles from '@components/pages/Home/index.module.scss';

interface IProps {
  text: string
  setFinishedText: Dispatch<SetStateAction<boolean>>
}

const About: FC<IProps> = ({ text, setFinishedText }) => {
  return (
    <section
      className={styles.about}
      data-aos="fade-up"
      data-aos-delay="800"
    >
      <h2>About</h2>
      <Typewriter text={text} speed={15} delay={1200} onFinished={setFinishedText} />
    </section>
  );
};

export default About
