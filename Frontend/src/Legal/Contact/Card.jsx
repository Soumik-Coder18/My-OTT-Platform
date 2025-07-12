import React from 'react';
import styled from 'styled-components';
import cardPhoto from './cardphoto.jpeg';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-photo" />
        <div className="card-title">
          SOUMIK BAG <br />
          <span>Fullstack Dev &amp; UX UI</span>
        </div>
        
        {/* Portfolio Link */}
        <div className="portfolio-link">
          <a
            href="https://soumikportfolio-five.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Portfolio</span>
          </a>
        </div>

        <div className="card-socials">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/soumik_bag_18/" 
            target="_blank"
            rel="noopener noreferrer"
            className="card-socials-btn instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M224,202a53,53,0,1,0,53,53A53,53,0,0,0,224,202Zm124-41a29,29,0,1,1,29-29A29,29,0,0,1,348,161ZM398.8,80A82.29,82.29,0,0,0,368,51.2C341.9,32,309.6,24,256,24H192c-53.6,0-85.9,8-112,27.2A82.29,82.29,0,0,0,49.2,80C30,106.1,24,138.4,24,192v64c0,53.6,8,85.9,27.2,112a82.29,82.29,0,0,0,28.8,30.8C106.1,482,138.4,488,192,488h64c53.6,0,85.9-6,112-27.2a82.29,82.29,0,0,0,30.8-28.8C470,341.9,476,309.6,476,256V192C476,138.4,470,106.1,450.8,80ZM224,338a82,82,0,1,1,82-82A82,82,0,0,1,224,338Zm134-164a29,29,0,1,1,29-29A29,29,0,0,1,358,174Z"/>
            </svg>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/Soumik-Coder18" 
            target="_blank"
            rel="noopener noreferrer"
            className="card-socials-btn github"
          >
            <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/soumik-bag-0b9900253/" 
            target="_blank"
            rel="noopener noreferrer"
            className="card-socials-btn linkedin"
          >
            <svg height={24} viewBox="0 0 512 512" width={24} xmlns="http://www.w3.org/2000/svg">
              <path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z" />
            </svg>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --font-color: #ffffff;
    --font-color-sub: #a855f7;
    --bg-color: rgba(17, 24, 39, 0.8);
    --main-color: #a855f7;
    width: 280px;
    height: 350px;
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(88, 28, 135, 0.8) 100%);
    border: 2px solid var(--main-color);
    box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.2);
  }

  .card-photo {
    width: 100px;
    height: 100px;
    background-image: url(${cardPhoto});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 3px solid var(--main-color);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    transition: all 0.3s ease;
  }

  .card-photo:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
  }

  .card-title {
    text-align: center;
    color: var(--font-color);
    font-size: 1.25rem;
    font-weight: 600;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 1rem;
  }

  .card-title span {
    font-size: 0.875rem;
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .portfolio-link {
    margin-bottom: 1rem;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .portfolio-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, var(--main-color) 0%, #ec4899 100%);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
  }

  .portfolio-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5);
    background: linear-gradient(135deg, #ec4899 0%, var(--main-color) 100%);
  }

  .card-socials {
    display: flex;
    height: 0;
    opacity: 0;
    gap: 15px;
    transition: 0.5s ease;
  }

  .card:hover > .card-socials {
    height: 35px;
    opacity: 1;
  }

  .card-socials-btn {
    width: 35px;
    height: 35px;
    border: 2px solid var(--main-color);
    background: rgba(168, 85, 247, 0.1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .card-socials-btn:hover {
    background: var(--main-color);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.4);
  }

  .card-socials-btn svg {
    width: 20px;
    height: 20px;
    fill: var(--main-color);
    transition: all 0.3s ease;
  }

  .card-socials-btn:hover svg {
    fill: white;
  }
`;

export default Card;
