import Page from "./page";
import ContentCard from "./contentCard";
import artProjectOne from './images/artProjectOne.jpg';
import carr from './images/ap-art-carr_orig.jpg';
import cedeno from './images/ap-art-cendeno_orig.jpg';
import karen from './images/ap-art-karen-perry_orig.jpg';
import bell from './images/ap-art-mary-bell_orig.jpg';
import moira from './images/ap-art-moira-donovan_orig.jpg';
import putvain from './images/ap-art-putvain_orig.jpg';
import riffyB from './images/ap-art-riffy-b_orig.jpg';
import rita from './images/ap-art-rita-ciambra_orig.jpg';
import sheila from './images/ap-art-sheila_orig.jpg';
import averill from './images/averill_orig.jpg';
import dolan from './images/dolan_orig.jpeg';
import dan from './images/daniel-gilbert_orig.jpg';
import chad from './images/chad_orig.jpg';
import lindsey from './images/lindsey_orig.jpg';
import michelle from './images/michelle_orig.jpg';
import mark from './images/mark_orig.jpg';
import vandee from './images/vandee_orig.jpg';
import yosko from "./images/yosko_orig.jpg";
import tarah from './images/tarah_orig.jpg';
import trees from './images/trees.jpg';
import astronomy from './images/astronomy.jpg';
import bus from './images/bus.jpg';
import baby from './images/baby.jpg';
import birthday from './images/birthday.jpg';
import camera from './images/camera.jpg';
import coffee from './images/coffee.jpg';
import exit from './images/exit.jpg';
import fuzzy from './images/fuzzy.jpg';
import gpop from './images/gpop.jpg';
import house from './images/house.jpg';
import joy from './images/joy.jpg';
import path from './images/path.jpg';
import school from './images/school.jpg';
import sparks from './images/sparks.jpg';
import stairs from './images/stairs.jpg';
import spirals from './images/spirals.jpg';
import window from './images/window.jpg';
import selfPortrait from './images/portrait.jpg';
import './styles.css';
import { useSearch } from './searchContext';
import { useEffect, useRef, useState } from "react";

const artProjects = [
  {
    title: "Portraits in a Magazine",
    year: "2025",
    size: null,
    description: "Drew portraits of my boyfriend in a Brooklyn Rail magazine. Created as a final assignment for NYC and the Visual Arts class in fall 2025. The drawing was layered over an advertisement for one of the shows we attended during class.",
    statement: null,
    imageUrl: artProjectOne,
    tags: "portrait drawing pencil magazine brooklyn rail nyc art charcoal",
  },
  {
    title: "The Cycles of Grief",
    year: "2022-2023",
    size:"Variable",
    description: "Digitally edited images of my father and grandfather that I did in high school for my Junio year AP Art concentration",
    statement: "Grief is complicated, I would even argue the most complicated emotion that a person can feel. It’s hard to understand how and when it will show itself. As someone who has experienced many losses in my life I still struggle to fully understand how grief has and will continue to present itself in my day to day life. It can sneak up on you when you least expect it, making you suddenly feel dejected even if you previously felt fine or happy. I once heard someone say something along the lines of “Grief isn’t a process that stops once you get to acceptance, it is a cycle that bounces around until you either die or forget.” Life moves on but the feeling of misery and heartache doesn’t, it just gets easier to deal with. When trying to figure out what I wanted to create for my concentration I originally decided that I wanted to try and capture this idea of grief and what it can feel like to look back on old memories of those lost. For me that meant exploring emotions surrounding the losses of my dad, who died when I was 13, and my grandfather, who passed just two years later in the same month. The main media that I’ve used for my concentration has been digital editing of old photos and pictures of simple watercolor paintings that I’ve made. In each watercolor piece that I made I tried to capture certain emotions, whether that be happiness or acceptance in bright colors like reds, pinks, and yellows, or more somber ideas in darker, cooler tones, like purples and blues. My goal in creating each image was to draw out a strong emotion and feeling of nostalgia. As my concentration grew it shifted to focus more around that notion of nostalgia. Some images in particular portray a feeling of numbness that comes with constant pain and grief while others, like the image of the bus windows, coffee spill, and film camera illustrate how grief can consume your thoughts through day to day activities. Despite the fact that my current concentration doesn't match the original plan I had outlined for myself, I feel that letting go of control and seeing where my thoughts and emotions in the moment took me, allowed me to create a concentration of work more faithful to my experience caught in the cycles of grief.",
    images: [coffee, gpop, trees, birthday, joy, sparks, spirals, fuzzy, camera, window, baby, astronomy, school, exit, bus, stairs, path, house],
    tags: "digital art design graphic double exposure grief death father dad grandfather watercolor concentration photos",
  },
  {
    title: "Faculty Auras",
    year: "2023-2024",
    size: "Variable",
    description: "Portraits of my teachers from high school that I did for my Senior year AP Art concentration",
    statement: "When I was trying to decide what I wanted to do for my concentration this year I was torn. I had two ideas that I really liked, but only enough time for one. After some internal debate, I finally decided in favor of doing something more positive with my work this time around. I went around and took high contrast photos of staff and faculty. Through editing, I created a black and white image that I then used to create a portrait in one of three materials. Most of my current work is charcoal, with liquid watercolors, forming the backgrounds that represent the 'auras' that each person gives off. The white charcoal is similar in that the watercolor creates the aura, but instead of drawing the shadows, I’m drawing the highlights. The final material is chalk pastel, which was done on matte board rather than the paper I was using for the others. In this case, the background came last, instead, I chose the colors for the face first, the main aura that I get, and the background was made up of the secondary colors of the individual's personality. ",
    images: [vandee, michelle, dan, lindsey, yosko, averill, chad, dolan, karen, bell, carr, sheila, riffyB, moira, rita, cedeno, putvain, mark, tarah],
    tags: "concentration white charcoal chalk pastel large portrait auras teachers faculty watercolor",
  },
  {
    title: " Highschool Self-Portrait",
    description: "Charcoal self-portrait that I did for a class in my sophomore year of high school to practice foreshortening",
    imageUrl: selfPortrait,
    tags: "charcoal portrait books foreshortening "
  },
  ];

export default function ArtPortfolio() {
  const { submittedTerm } = useSearch();
  const itemRefs = useRef([]);
  const [filterTerm, setFilterTerm] = useState('');

  const filteredProjects = artProjects.filter(p => {
    const term = filterTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.tags.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    if (!submittedTerm.trim()) return;
    const term = submittedTerm.toLowerCase();
    const firstMatch = itemRefs.current.find(
      el => el && el.dataset.tags?.toLowerCase().includes(term)
    );
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstMatch.classList.add('search-highlight');
      setTimeout(() => firstMatch.classList.remove('search-highlight'), 2000);
    }
  }, [submittedTerm]);

  return (
    <Page>
      <h2>Art Portfolio</h2>
      <p className="flip-hint">Click a card to learn more</p>

      <div className="portfolio-search">
        <input
          type="text"
          placeholder="Filter by title, medium, tags…"
          value={filterTerm}
          onChange={e => setFilterTerm(e.target.value)}
          className="portfolio-search-input"
        />
        {filterTerm && (
          <button className="portfolio-search-clear" onClick={() => setFilterTerm('')}>
            ✕
          </button>
        )}
        {filterTerm && (
          <span className="portfolio-search-count">
            {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!filterTerm && filteredProjects.length === 0 && (
        <p className="no-results">No projects found for "{filterTerm}"</p>
      )}

      <div className="cards-grid">
        {filteredProjects.map((p, i) => (
          <div
            key={p.title}
            ref={el => itemRefs.current[i] = el}
            data-tags={p.tags}
          >
            <ContentCard
              title={p.title}
              description={p.description}
              imageUrl={p.imageUrl}
              images={p.images}
              year={p.year}
              size={p.size}
              medium={p.medium}
              statement={p.statement}
            />
          </div>
        ))}
      </div>
    </Page>
  );
}
