const DummyLinks = [
  {
    name: "link 1",
    date: "2023",
    tagline: "Stream of my favorite papers and links",
    link: "https://www.rsrch.space/"
  },
  {
    name: "link 2",
    date: "2023",
    tagline: "Browse the web with GPT-4V and Vimium",
    link: "https://github.com/ishan0102/vimGPT"
  },
  {
    name: "link 3",
    date: "2023",
    tagline: "Zettelkasten for my brain using Quartz",
    link: "https://www.ishan.coffee/"
  },
];

function Link({ name, date, tagline, link }) {
  return (
    <a href={link} className="flex justify-between text-secondary py-1 group">
      <strong className="flex-none font-medium text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-500">{name}</strong>
      <p className="ml-auto hidden sm:inline mr-8">{tagline}</p>
      <p>{date}</p>
    </a>
  )
}

export function Links() {
  return (
    <div className="max-h-screen w-full flex-col overflow-y-scroll scrollbar-hide px-8">
      <div className="mx-auto w-full max-w-2xl mt-4 sm:mt-8 mb-52 md:mb-32">
        {DummyLinks.map((project, index) => {
          return <Link
            key={index}
            name={project.name}
            date={project.date}
            tagline={project.tagline}
            link={project.link}
          />
        })}
      </div>
    </div>
  )
}
