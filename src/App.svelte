<script lang="ts">
  const name: string = "world";
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="stylesheet"
    href="https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.css"
  />
</svelte:head>

<div class="container">
  <div>
    <img
      src="https://avatars.githubusercontent.com/u/19630580?v=4"
      alt="Utkarsh's face"
    />
  </div>
  <h1>Utkarsh Goel</h1>
  <h2>Founder, <a href="https://deploif.ai">Deploifai</a></h2>
  <p>
    <a href="https://github.com/utkarsh867" target="_blank">GitHub</a>,
    <a href="https://twitter.com/javachipd" target="_blank">Twitter</a>,
    <a href="https://linkedin.com/in/utkarsh867" target="_blank">LinkedIn</a>,
    <a href="https://github.com/utkarsh867" target="_blank">Discord</a>
  </p>

  <p>
    I am a software developer obsessed with building things that help change the
    world for the better.
  </p>
  <p>
    I co-founded and build <a href="https://clearbot.org">Clearbot</a>
    and lead technology development as CTO at
    <a href="https://openoceancam.com">Open Ocean Camera</a>. I have recently
    stumbled upon a problem in MLOps so I have founded
    <a href="https://deploif.ai">Deploifai</a> to solve it for myself and everyone
    else.
  </p>

  <p>
    I also love teaching and sharing things in tech and I'll build a developer
    community wherever one needs to exist!
  </p>

  <p>
    <span>Would like to have me as a freelance software developer?<br /></span>
    I can build web applications, do some UI/UX and I'll crush backend development
    and DevOps. Contact me at my email:
    <a href="mailto:contact@utkarshgoel.dev">contact@utkarshgoel.dev</a>.
  </p>
</div>

<style>
  @font-face {
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    font-weight: normal;
    src: url("/fonts/PlusJakartaSans-Regular.woff") format("woff");
  }
  @font-face {
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    font-weight: lighter;
    src: url("/fonts/PlusJakartaSans-Light.woff") format("woff");
  }
  @font-face {
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    font-weight: bold;
    src: url("/fonts/PlusJakartaSans-Bold.woff") format("woff");
  }

  .container {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 45rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  h1 {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: bold;
  }
  h2 {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: normal;
  }

  p {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: large;
    line-height: 2rem;
    word-spacing: 0.2rem;
  }

  img {
    width: 15rem;
  }

  span {
    font-weight: bold;
  }
</style>
