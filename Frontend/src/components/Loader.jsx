import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="scene">
        <div className="forest">
          <div className="tree tree1">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
          </div>
          <div className="tree tree2">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
          <div className="tree tree3">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
          <div className="tree tree4">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
          <div className="tree tree5">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
          <div className="tree tree6">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
          <div className="tree tree7">
            <div className="branch branch-top" />
            <div className="branch branch-middle" />
            <div className="branch branch-bottom" />
          </div>
        </div>
        <div className="tent">
          <div className="roof" />
          <div className="roof-border-left">
            <div className="roof-border roof-border1" />
            <div className="roof-border roof-border2" />
            <div className="roof-border roof-border3" />
          </div>
          <div className="entrance">
            <div className="door left-door">
              <div className="left-door-inner" />
            </div>
            <div className="door right-door">
              <div className="right-door-inner" />
            </div>
          </div>
        </div>
        <div className="floor">
          <div className="ground ground1" />
          <div className="ground ground2" />
        </div>
        <div className="fireplace">
          <div className="support" />
          <div className="support" />
          <div className="bar" />
          <div className="hanger" />
          <div className="smoke" />
          <div className="pan" />
          <div className="fire">
            <div className="line line1">
              <div className="particle particle1" />
              <div className="particle particle2" />
              <div className="particle particle3" />
              <div className="particle particle4" />
            </div>
            <div className="line line2">
              <div className="particle particle1" />
              <div className="particle particle2" />
              <div className="particle particle3" />
              <div className="particle particle4" />
            </div>
            <div className="line line3">
              <div className="particle particle1" />
              <div className="particle particle2" />
              <div className="particle particle3" />
              <div className="particle particle4" />
            </div>
          </div>
        </div>
        <div className="time-wrapper">
          <div className="time">
            <div className="day" />
            <div className="night">
              <div className="moon" />
              <div className="star star1 star-big" />
              <div className="star star2 star-big" />
              <div className="star star3 star-big" />
              <div className="star star4" />
              <div className="star star5" />
              <div className="star star6" />
              <div className="star star7" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  animation: stageBackground 5s ease-in-out infinite;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes stageBackground {
    0%, 10%, 90%, 100% {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    }

    25%, 75% {
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    }
  }

  @keyframes earthRotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes sunrise {
    0%, 10%, 90%, 100% {
      box-shadow: 0 0 0 25px #8b5cf6, 0 0 0 40px #7c3aed, 0 0 0 60px rgba(139, 92, 246, 0.6), 0 0 0 90px rgba(139, 92, 246, 0.3);
    }

    25%, 75% {
      box-shadow: 0 0 0 0 #8b5cf6, 0 0 0 0 #7c3aed, 0 0 0 0 rgba(139, 92, 246, 0.6), 0 0 0 0 rgba(139, 92, 246, 0.3);
    }
  }

  @keyframes moonOrbit {
    25% {
      transform: rotate(-60deg);
    }

    50% {
      transform: rotate(-60deg);
    }

    75% {
      transform: rotate(-120deg);
    }

    0%, 100% {
      transform: rotate(-180deg);
    }
  }

  @keyframes nightTime {
    0%, 90% {
      opacity: 0;
    }

    50%, 75% {
      opacity: 1;
    }
  }

  @keyframes hotPan {
    0%, 90% {
      background-color: #8b5cf6;
    }

    50%, 75% {
      background-color: #7c3aed;
    }
  }

  @keyframes heat {
    0%, 90% {
      box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.3);
    }

    50%, 75% {
      box-shadow: inset 0 -2px 0 0 white;
    }
  }

  @keyframes smoke {
    0%, 50%, 90%, 100% {
      opacity: 0;
    }

    50%, 75% {
      opacity: 0.7;
    }
  }

  @keyframes fire {
    0%, 90%, 100% {
      opacity: 0;
    }

    50%, 75% {
      opacity: 1;
    }
  }

  @keyframes treeShake {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(-2deg);
    }

    40% {
      transform: rotate(4deg);
    }

    50% {
      transform: rotate(-4deg);
    }

    60% {
      transform: rotate(6deg);
    }

    75% {
      transform: rotate(-6deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes fireParticles {
    0% {
      height: 30%;
      opacity: 1;
      top: 75%;
    }

    25% {
      height: 25%;
      opacity: 0.8;
      top: 40%;
    }

    50% {
      height: 15%;
      opacity: 0.6;
      top: 20%;
    }

    75% {
      height: 10%;
      opacity: 0.3;
      top: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes fireLines {
    0%, 25%, 75%, 100% {
      bottom: 0;
    }

    50% {
      bottom: 5%;
    }
  }

  .scene {
    display: flex;
    margin: 0 auto 80px auto;
    justify-content: center;
    align-items: flex-end;
    width: 400px;
    height: 300px;
    position: relative;
  }

  .forest {
    display: flex;
    width: 75%;
    height: 90%;
    position: relative;
  }

  .tree {
    display: block;
    width: 50%;
    position: absolute;
    bottom: 0;
    opacity: 0.4;
  }

  .tree .branch {
    width: 80%;
    height: 0;
    margin: 0 auto;
    padding-left: 40%;
    padding-bottom: 50%;
    overflow: hidden;
  }

  .tree .branch:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    margin-left: -600px;
    border-left: 600px solid transparent;
    border-right: 600px solid transparent;
    border-bottom: 950px solid #374151;
  }

  .tree .branch.branch-top {
    transform-origin: 50% 100%;
    animation: treeShake 0.5s linear infinite;
  }

  .tree .branch.branch-middle {
    width: 90%;
    padding-left: 45%;
    padding-bottom: 65%;
    margin: 0 auto;
    margin-top: -25%;
  }

  .tree .branch.branch-bottom {
    width: 100%;
    padding-left: 50%;
    padding-bottom: 80%;
    margin: 0 auto;
    margin-top: -40%;
  }

  .tree1 {
    width: 31%;
  }

  .tree1 .branch-top {
    transition-delay: 0.3s;
  }

  .tree2 {
    width: 39%;
    left: 9%;
  }

  .tree2 .branch-top {
    transition-delay: 0.4s;
  }

  .tree3 {
    width: 32%;
    left: 24%;
  }

  .tree3 .branch-top {
    transition-delay: 0.5s;
  }

  .tree4 {
    width: 37%;
    left: 34%;
  }

  .tree4 .branch-top {
    transition-delay: 0.6s;
  }

  .tree5 {
    width: 44%;
    left: 44%;
  }

  .tree5 .branch-top {
    transition-delay: 0.7s;
  }

  .tree6 {
    width: 34%;
    left: 61%;
  }

  .tree6 .branch-top {
    transition-delay: 0.2s;
  }

  .tree7 {
    width: 24%;
    left: 76%;
  }

  .tree7 .branch-top {
    transition-delay: 0.1s;
  }

  .tent {
    width: 60%;
    height: 25%;
    position: absolute;
    bottom: -0.5%;
    right: 15%;
    z-index: 1;
    text-align: right;
  }

  .roof {
    display: inline-block;
    width: 45%;
    height: 100%;
    margin-right: 10%;
    position: relative;
    z-index: 1;
    border-top: 4px solid #4b5563;
    border-right: 4px solid #4b5563;
    border-left: 4px solid #4b5563;
    border-top-right-radius: 6px;
    transform: skew(30deg);
    box-shadow: inset -3px 3px 0px 0px #8b5cf6;
    background: #7c3aed;
  }

  .roof:before {
    content: "";
    width: 70%;
    height: 70%;
    position: absolute;
    top: 15%;
    left: 15%;
    z-index: 0;
    border-radius: 10%;
    background-color: #6d28d9;
  }

  .roof:after {
    content: "";
    height: 75%;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: linear-gradient(to bottom, rgba(109, 40, 217, 0.4) 0%, rgba(109, 40, 217, 0.4) 64%, rgba(109, 40, 217, 0.8) 65%, rgba(109, 40, 217, 0.8) 100%);
  }

  .roof-border-left {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 1%;
    height: 125%;
    position: absolute;
    top: 0;
    left: 35.7%;
    z-index: 1;
    transform-origin: 50% 0%;
    transform: rotate(35deg);
  }

  .roof-border-left .roof-border {
    display: block;
    width: 100%;
    border-radius: 2px;
    border: 2px solid #4b5563;
  }

  .roof-border-left .roof-border1 {
    height: 40%;
  }

  .roof-border-left .roof-border2 {
    height: 35%;
  }

  .roof-border-left .roof-border3 {
    height: 25%;
  }

  .entrance {
    display: block;
    width: 30%;
    height: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
  }

  .entrance .door {
    display: inline-block;
    width: 50%;
    height: 100%;
    position: relative;
    border: 2px solid #4b5563;
    background-color: #374151;
  }

  .entrance .left-door {
    border-right: 1px solid #4b5563;
  }

  .entrance .right-door {
    border-left: 1px solid #4b5563;
  }

  .entrance .left-door-inner {
    display: block;
    width: 80%;
    height: 80%;
    margin: 10%;
    border-radius: 2px;
    background-color: #6b7280;
  }

  .entrance .right-door-inner {
    display: block;
    width: 80%;
    height: 80%;
    margin: 10%;
    border-radius: 2px;
    background-color: #6b7280;
  }

  .floor {
    display: block;
    width: 100%;
    height: 5%;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }

  .floor .ground {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    border-radius: 2px;
  }

  .floor .ground1 {
    background-color: #374151;
  }

  .floor .ground2 {
    background-color: #4b5563;
    height: 50%;
    bottom: 50%;
  }

  .fireplace {
    display: block;
    width: 15%;
    height: 20%;
    position: absolute;
    bottom: 5%;
    left: 15%;
    z-index: 1;
  }

  .fireplace .support {
    display: block;
    width: 15%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background-color: #6b7280;
  }

  .fireplace .support:first-child {
    left: 0;
  }

  .fireplace .support:last-child {
    right: 0;
  }

  .fireplace .bar {
    display: block;
    width: 100%;
    height: 8%;
    position: absolute;
    top: 20%;
    background-color: #6b7280;
  }

  .fireplace .hanger {
    display: block;
    width: 60%;
    height: 2%;
    position: absolute;
    top: 30%;
    left: 20%;
    background-color: #6b7280;
  }

  .fireplace .pan {
    display: block;
    width: 40%;
    height: 15%;
    position: absolute;
    top: 40%;
    left: 30%;
    border-radius: 50%;
    background-color: #8b5cf6;
    animation: hotPan 5s linear infinite;
  }

  .fireplace .smoke {
    display: block;
    width: 20%;
    height: 25%;
    position: absolute;
    top: 25%;
    left: 37%;
    background-color: white;
    filter: blur(5px);
    animation: smoke 5s linear infinite;
  }

  .fireplace .fire {
    display: block;
    width: 25%;
    height: 120%;
    position: absolute;
    bottom: 0;
    left: 33%;
    z-index: 1;
    animation: fire 5s linear infinite;
  }

  .fireplace .fire:before {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -4px;
    z-index: 1;
    border-radius: 2px;
    border: 1px solid #f59e0b;
    background-color: #f59e0b;
  }

  .fireplace .fire .line {
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    bottom: 0;
    animation: fireLines 1s linear infinite;
  }

  .fireplace .fire .line2 {
    left: 50%;
    margin-left: -1px;
    animation-delay: 0.3s;
  }

  .fireplace .fire .line3 {
    right: 0;
    animation-delay: 0.5s;
  }

  .fireplace .fire .line .particle {
    height: 10%;
    position: absolute;
    top: 100%;
    z-index: 1;
    border-radius: 2px;
    border: 2px solid #f59e0b;
    animation: fireParticles 0.5s linear infinite;
  }

  .fireplace .fire .line .particle1 {
    animation-delay: 0.1s;
  }

  .fireplace .fire .line .particle2 {
    animation-delay: 0.3s;
  }

  .fireplace .fire .line .particle3 {
    animation-delay: 0.6s;
  }

  .fireplace .fire .line .particle4 {
    animation-delay: 0.9s;
  }

  .time-wrapper {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }

  .time {
    display: block;
    width: 100%;
    height: 200%;
    position: absolute;
    transform-origin: 50% 50%;
    transform: rotate(270deg);
    animation: earthRotation 5s linear infinite;
  }

  .time .day {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 20%;
    left: 40%;
    border-radius: 50%;
    box-shadow: 0 0 0 25px #8b5cf6, 0 0 0 40px #7c3aed, 0 0 0 60px rgba(139, 92, 246, 0.6), 0 0 0 90px rgba(139, 92, 246, 0.3);
    animation: sunrise 5s ease-in-out infinite;
    background-color: #8b5cf6;
  }

  .time .night {
    animation: nightTime 5s ease-in-out infinite;
  }

  .time .night .star {
    display: block;
    width: 4px;
    height: 4px;
    position: absolute;
    bottom: 10%;
    border-radius: 50%;
    background-color: #fff;
  }

  .time .night .star-big {
    width: 6px;
    height: 6px;
  }

  .time .night .star1 {
    right: 23%;
    bottom: 25%;
  }

  .time .night .star2 {
    right: 35%;
    bottom: 18%;
  }

  .time .night .star3 {
    right: 47%;
    bottom: 25%;
  }

  .time .night .star4 {
    right: 22%;
    bottom: 20%;
  }

  .time .night .star5 {
    right: 18%;
    bottom: 30%;
  }

  .time .night .star6 {
    right: 60%;
    bottom: 20%;
  }

  .time .night .star7 {
    right: 70%;
    bottom: 23%;
  }

  .time .night .moon {
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 22%;
    right: 33%;
    border-radius: 50%;
    transform: rotate(-60deg);
    box-shadow: 9px 9px 3px 0 white;
    filter: blur(1px);
    animation: moonOrbit 5s ease-in-out infinite;
  }

  .time .night .moon:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -9px;
    left: 9px;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.05), 0 0 0 15px rgba(255, 255, 255, 0.05), 0 0 0 25px rgba(255, 255, 255, 0.05), 0 0 0 35px rgba(255, 255, 255, 0.05);
    background-color: rgba(255, 255, 255, 0.2);
  }`;

export default Loader;
