import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/css/Home.module.css'
import { Navbar, Textarea, Button ,NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Link} from '@nextui-org/react';
import InfoCard from '@/components/InfoCard';
const Home: NextPage = () => {
  return (
    <div className='container'>
      {/* Navbar */}
      <Navbar>
        <NavbarBrand>
          <Textarea>
            LearnToCode
          </Textarea>
        </NavbarBrand>
        <NavbarContent hidden={true}>
          <NavbarItem as={Link} href="#">Learning Platform</NavbarItem>
          <NavbarItem as={Link} href="#">Community</NavbarItem>
          <NavbarItem as={Link} href="#">Contact Us</NavbarItem>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem as={Link} href="#">Login</NavbarItem>
          <NavbarItem>
            <Button href="#">
              Sign Up
            </Button> 
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/* Jumbotron */}
      <div className="jumbotron" style={{height: "500px", backgroundImage: "url(https://littlevisuals.co/images/sunset.jpg)"}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 text-center">
              <h1 className="display-4">Bạn muốn chọn vào</h1>
              <h1 className="display-4">nhóm nào khác?</h1>
          </div>
        </div>
      </div>
      {/* 3 Displaying Product Cards */}
      <div className="grid-container" style={{gap: "2rem"}}>
        <div className="grid-item" style={{maxWidth: "calc(100% / 12 * 12)", minWidth: "calc(100% / 12 * 3)"}}>
          <InfoCard
            label="Nhóm 1"
            title="Topic A"
            imageURL="https://littlevisuals.co/images/red_dawn.jpg"
            studentCount="4"
          />
        </div>
        <div className="grid-item" style={{maxWidth: "calc(100% / 12 * 3)", minWidth: "calc(100% / 12 * 3)"}}>
          <InfoCard
            label="Nhóm 2"
            title="Topic B"
            imageURL="https://littlevisuals.co/images/sunset.jpg"
            studentCount="3"
          />
        </div>
        <div className="grid-item" style={{maxWidth: "calc(100% / 12 * 3)", minWidth: "calc(100% / 12 * 3)"}}>
          <InfoCard
            label="Nhóm 3"
            title="Topic C"
            imageURL="https://littlevisuals.co/images/tail.jpg"
            studentCount="5"
          />
        </div>
        <div className="grid-item" style={{maxWidth: "calc(100% / 12 * 3)", minWidth: "calc(100% / 12 * 3)"}}>
          <InfoCard
            label="Nhóm 4"
            title="Topic D"
            imageURL="https://littlevisuals.co/images/steam.jpg"
            studentCount="5"
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home