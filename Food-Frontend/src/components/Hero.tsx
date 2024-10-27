import hero from "../assets/hero.png";


const Hero = () => {
  return (
    <div>
        <img src={hero} alt="hero" className="w-full max-h-[600px] object-cover" loading='lazy'/>
    </div>
  )
}

export default Hero