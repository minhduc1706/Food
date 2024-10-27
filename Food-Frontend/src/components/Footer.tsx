import logo from '../assets/LogoFood.png'; 

const Footer = () => {
  return (
    <div className="bg-orange-500 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <span className="text-white font-bold tracking-tight">
            <img src={logo} alt="Logo" className="w-24 h-auto" loading='lazy'/>
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Term of Service</span>
            </span>
        </div>
    </div>
  )
}

export default Footer