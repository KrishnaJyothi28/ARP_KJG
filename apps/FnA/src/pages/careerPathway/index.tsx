import React, { useState } from 'react';
import { Twitter, Facebook, Linkedin } from 'react-bootstrap-icons';
import Modal from 'ui/EmbedPageComponent';
import Layout from '../layout';
import OccupationNodes from 'src/containers/OccupationNodes';
import OccupationModal from '../OccupationModal/OccupationModal';

function CareerPathway() {
  const [shareShow, setShareShow] = useState(false);
  const [embedShow, setEmbedShow] = useState(false);
  const [filteredData, setfilteredData] = useState({
    Title: '',
    Description: '',
    TabContents: ['Tab 1 content', 'Tab 2 content', 'Tab 3 data', 'Tab 4 data'],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShareClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setShareShow(true);
    const buttonText = event.currentTarget.textContent;
    setfilteredData(filteredData);
  };
  const handleEmbedClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setEmbedShow(true);
    const buttonText = event.currentTarget.textContent;
    setfilteredData(filteredData);
  };
  const handleCopy = () => {
    const textBox = document.getElementById('embedTextBox') as HTMLInputElement;
    const copiedText = document.getElementById('copiedText') as HTMLInputElement;
    textBox!.select();
    navigator.clipboard.writeText(textBox.value);
    copiedText.innerHTML = 'copied Text!';
  };
  return (
    <div style={{backgroundColor:'#193957'}}>
      <Layout>
        <Modal
          title="Share"
          onClose={() => setShareShow(false)}
          closeBtn={false}
          show={shareShow}
          tabContent={filteredData.TabContents}
        >
          <button
            onClick={() =>
              window.open(
                'https://twitter.com/intent/tweet?url=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap&text=Finance%26Accountants%20Carreers%20',
                '_blank'
              )
            }
            style={{
              backgroundColor: '#1CA0F2',
              marginLeft: '10px',
              borderColor: 'inherit',
              borderRadius: '5px',
              color: 'white',
              padding: '10px 8px',
            }}
          >
            <Twitter color="white" /> Twitter
          </button>
          <button
            onClick={() =>
              window.open(
                'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap&ext=1687863193&hash=AeZypkPXMVqAHaX7Sxk',
                '_blank'
              )
            }
            style={{
              backgroundColor: '#3B5897',
              marginLeft: '10px',
              borderColor: 'inherit',
              borderRadius: '5px',
              color: 'white',
              padding: '10px 8px',
            }}
          >
            <Facebook color="white" /> Facebook
          </button>
          <button
            onClick={() =>
              window.open(
                'https://www.linkedin.com/shareArticle?url=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap',
                '_blank'
              )
            }
            style={{
              backgroundColor: '#0074B3',
              marginLeft: '10px',
              borderColor: 'inherit',
              borderRadius: '5px',
              color: 'white',
              padding: '10px 8px',
            }}
          >
            <Linkedin color="white" /> LinkedIn
          </button>
        </Modal>
        <Modal
          title="Embed"
          onClose={() => setEmbedShow(false)}
          closeBtn={false}
          show={embedShow}
          tabContent={filteredData.TabContents}
        >
          <p style={{ marginLeft: '10px' }}>
            Embed chart:
            <br />
            <textarea id="embedTextBox" style={{ width: '75%' }} rows={3} typeof="text">
              {
                "<iframe height='768' width='664' frameborder='0'  src='https://financeandaccountantcareers.com/careerpathway_embed'></iframe>"
              }
            </textarea>
          </p>
          <p id="copiedText" style={{ color: '#83D2E2', marginLeft: '10px' }}></p>
          <button
            onClick={handleCopy}
            style={{ backgroundColor: '#FAA42A', float: 'right', margin: '10px' }}
            type="button"
            className="btn btn-info btn-md"
          >
            Copy Embed Code
          </button>
        </Modal>
        <div style={{ backgroundColor: '#112A45', color: 'white', marginBottom:'32px'}}>
          <div style={{ padding: '50px' }}>
            <h1 style={{ fontWeight: 'lighter', margin: '0 0 0 10px', paddingBottom: '10px' }}>Career Pathway</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ alignContent: 'flex-start' }}>
                <p
                  style={{
                    fontWeight: 'normal',
                    margin: '0 0 0 10px',
                    paddingBottom: '10px',
                    fontSize: '18px',
                    maxWidth: '720px',
                  }}
                >
                  Explore transportation career paths available for a wide variety of job roles. Take
                  a deep dive into each role to find salary information, certificate and degree info and the skills
                  required for each position.
                </p>
                <hr style={{ width: '100%', justifyContent: 'center', color: '#319AB0' }}></hr>
                <p style={{ fontWeight: 'normal', margin: '0 0 0 10px', paddingBottom: '10px', color: '#BEC9D6' }}>
                  Mouse over a circle to see the common career pathways to and from each title. Click on a circle to see
                  the title(s) in each circle. Click on a title to see all of the details for that title.
                </p>
              </div>
              <div
                style={{ alignContent: 'flex-end', justifyContent: 'flex-end', display: 'flex', flexDirection: 'row' }}
              >
                <button
                  onClick={handleShareClick}
                  style={{
                    height: '40px',
                    margin: '30px 10px 0 0',
                    padding: '0 15px 0 15px',
                    backgroundColor: '#7ED1E2',
                    borderRadius: '5px',
                  }}
                  type="button"
                  className="btn btn-info btn-lg"
                >
                  Share
                </button>
                <button
                  onClick={handleEmbedClick}
                  style={{
                    height: '40px',
                    margin: '30px 10px 0 0',
                    padding: '0 15px 0 15px',
                    backgroundColor: '#7ED1E2',
                    borderRadius: '5px',
                  }}
                  type="button"
                  className="btn btn-info btn-lg"
                >
                  Embed
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12' style={{backgroundColor:'#0c1f32', marginBottom:'32px'}}>
        <OccupationNodes openModel={handleOpenModal} />
        {isModalOpen && (
          <OccupationModal
            openModal={isModalOpen}
            closeModal={handleCloseModal}/>)}
            </div>
      </Layout>
    </div>
  );
}

export default CareerPathway;
