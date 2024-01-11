$(window).on("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Header Timeline
  const headerTL = gsap.timeline();
  headerTL
    .to($("#logo-loader"), {
      duration: 0.6,
      rotate: "50deg",
      yPercent: 200,
      ease: "expo.in",
    })
    .to(
      $("#preloader"),
      { duration: 0.8, yPercent: 100, ease: "expo.in" },
      "-=0.4"
    )
    .from($(".header").find(".greeting"), {
      duration: 0.8,
      yPercent: 100,
      ease: "expo.out",
    })
    .from(
      $(".header").find(".name"),
      { duration: 0.8, yPercent: 120, ease: "expo.out" },
      "-=0.6"
    )
    .from(
      $(".header").find(".intro"),
      { duration: 0.8, autoAlpha: 0, yPercent: 60, ease: "expo.out" },
      "-=0.4"
    )
    .from(
      $(".top-nav"),
      { duration: 1, autoAlpha: 0, yPercent: 10, ease: "expo.out" },
      "-=0.6"
    );

  // Create Navigation
  $("nav").append(`
<ul>
	<li class="to-projects"><a href="#">My Projects</a></li>
	<li class="to-about"><a href="#">About Me</a></li>
	<li class="to-contact"><a href="#">Say Hi!</a></li>
	<li>
		<button
			title="Download Resume"
			onclick="window.open('./files/Lesan_Resume_2.0.pdf');"
		>
			<img
				src="./img/resume.svg"
				alt="Download Resume"
                title="Resume"
			/>
		</button>
	</li>
</ul>
`);

  // Wrap elements
  $(".wrapped").each((i, el) => {
    $(el).removeClass("wrapped");
    $(el).wrap("<div class='wrapped'></div>");
  });

  // Floating Navigation bar
  const navFloatAnimation = gsap.from(".bottom-nav", {
    paused: true,
    duration: 0.4,
    ease: "power3.out",
    y: 400,
    scale: 0.9,
  });
  ScrollTrigger.create({
    start: "100px top",
    end: 99999,

    onLeaveBack: () => {
      navFloatAnimation.reverse();
    },
    onUpdate: (self) => {
      self.direction === -1
        ? navFloatAnimation.play()
        : navFloatAnimation.reverse();
    },
  });

  // Navigation

  const controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    triggerElement: "section.about",
    duration: $("section.about").height(),
  })
    .setClassToggle(".to-about", "active")
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "section.projects",
    duration: $("section.projects").height(),
  })
    .setClassToggle(".to-projects", "active")
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "section.footer",
    duration: $("section.footer").height(),
  })
    .setClassToggle(".to-contact", "active")
    .addTo(controller);

  $(".to-projects").on("click", (e) => {
    e.preventDefault();
    $("section.projects")[0].scrollIntoView();
  });

  $(".to-about").on("click", (e) => {
    e.preventDefault();
    $("section.about")[0].scrollIntoView();
  });

  $(".to-contact").on("click", (e) => {
    e.preventDefault();
    $("section.footer")[0].scrollIntoView();
  });

  // Side Navigation

  const sideNavTL = gsap.timeline();

  sideNavTL
    .from($(".side-nav").find("li"), {
      y: -10,
      autoAlpha: 0,
      stagger: 0.04,
      duration: 0.5,
      ease: "back.out(0.8)",
    })
    .to(
      $(".top-nav").find("li"),
      {
        y: -10,
        stagger: 0.04,
        duration: 0.5,
        autoAlpha: 0,
        ease: "expo.inOut",
      },
      "-=0.75"
    );

  new ScrollMagic.Scene({
    triggerElement: ".header",
    duration: 0,
    offset: 20,
    triggerHook: 0,
  })
    .setTween(sideNavTL)
    .addTo(controller);
});
