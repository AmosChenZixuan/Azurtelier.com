interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Santorini',
    description: `My java and react implementation of a strategy-based board game for 2 players, inspired by the cliffside villages of Santorini Island in Greece. 
    Players take turns building towers on a grid, with the goal of being the first to move one of their two workers on top of a three-story tower. 
    The game introduces complexity through God Power cards, which grant players unique abilities`,
    imgSrc: '/static/images/projects/santorini.webp',
    href: 'https://github.com/AmosChenZixuan/Santorini',
  },
  {
    title: 'Fluid Physics Simulator - 2D',
    description: `A simulation engine implemented in Python and Taichi that uses the Position-Based Fluids (PBF) algorithm. 
    It comes with several pre-configured scenes to showcase fluid dynamics, smoke simulation, and fluid-solid interaction.`,
    imgSrc: '/static/images/projects/pbf2d.png',
    href: 'https://github.com/AmosChenZixuan/taichi-PBF',
  },
  {
    title: 'PBD Simulator - 3D',
    description: `A simulation engine implemented in Python and Taichi that uses the Position-Based Dynamics (PBD) algorithm.
    It is designed to create and manipulate three-dimentional simulations and visualizations of rigid bodies, cloth, and ballons.`,
    imgSrc: '/static/images/projects/pbd3d.png',
    href: 'https://github.com/AmosChenZixuan/Taichi-PBD-3D',
  },
]

export default projectsData
