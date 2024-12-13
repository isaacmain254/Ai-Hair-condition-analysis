const NavbarStyles = {
  navbar: "w-full bg-white text-black  shadow-md relative",
  container: "container mx-auto flex flex-row justify-between items-center",
  logo: "text-2xl font-bold text-green-500  ps-4 md:ps-6",
  toggleButton: "text-2xl text-green-500 focus:outline-none",
  navLinks:
    "absolute z-50 md:z-0 md:relative flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0 text-white md:text-black  bg-gray-800  md:bg-transparent  w-full  transition-all duration-300",
  openMenu: "top-16 p-4 ",
  closedMenu: "top-[-200px] md:top-auto hidden md:flex",
  link: "hover:text-green-500",
  actionButtons: "mt-4 md:mt-0 hidden md:flex space-x-4 pr-4  md:pr-6",
  getStartedButton:
    "w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mx-0 md:mx-2 text-nowrap",
  loginButton:
    "w-full bg-transparent text-green-500 border border-green-500 px-4 py-2 rounded-lg hover:bg-green-100",
};

export default NavbarStyles;
