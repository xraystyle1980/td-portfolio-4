import { projects } from '@/data/projects'
import ProjectSection from './projects/ProjectSection'
import styles from './Work.module.css'

export default function Work() {
  return (
    <section id="work" className={styles.work}>
      <div className={styles.intro}>
        <h2 className={styles.title}>Case Studies</h2>
      </div>
      <div className={`${styles.projects} projects`}>
        {projects.map((project, index) => (
          <ProjectSection 
            key={project.title} 
            project={project}
            className={index % 2 === 0 ? styles.even : styles.odd}
          />
        ))}
      </div>
    </section>
  )
} 