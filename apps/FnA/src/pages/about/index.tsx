import React from 'react';
import s from './style.module.css';
import Image from 'next/image';
import AboutFnAImage1 from '../../assets/AboutFnAImage1.jpg';
import AboutFnAImage2 from '../../assets/AboutFnAImage2.jpg';
import Layout from '../layout';

function about() {
  return (
    <div className={s.aboutPage}>
<Layout>
      <div className={s.aboutContainer}>
        <h2 className={s.aboutPageHeader}>
          <b>Who is this for?</b>
        </h2>
        <hr className={`${s.aboutHrLine}`}></hr>
        <div className={`${s.AboutCard}`}>
          <div className={`${s.cardText1}`}>
            <Image
              className={`${s.AboutFnAImage}`}
              src={AboutFnAImage1}
              alt="msaMapImage"
            ></Image>
            <div className={`${s.AboutCardText}`}>
              <h2 style={{ color: '#1E4B9E' }}>Current Finance Professionals</h2>
              <p className={s.AboutContent}>
                Whether you are a financial analyst just starting out or a seasoned professional seeking a path to the
                CFO, this tool allows you to find the skills that are necessary to move into the next role on your
                career journey and is valuable in helping you formulate a structured personal development plan to get to
                that next step.
              </p>
            </div>
          </div>
        </div>
        <div className={`${s.AboutCard}`}>
          <div className={`${s.cardText2}`}>
            <div className={`${s.AboutCardText} ${s.SecondCard}`}>
              <h2 style={{ color: '#1E4B9E' }}>Career Changers</h2>
              <p>
                The rapid acceleration of technology is having a profound impact on the careers and the life cycle of
                expertise and skills for all finance professionals. As technologies like AI and machine learning
                continue to disrupt long standing professions, what skills do you already posess that you can leverage
                to move into a new position on the finance team and what do you need to improve.
              </p>
            </div>
            <Image
              className={`${s.AboutFnAImage}`}
              src={AboutFnAImage2}
              alt="msaMapImage"
            ></Image>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
}

export default about;
