# 🌐 Personal Portfolio Website

A responsive personal portfolio website designed and developed to showcase my professional experience, technical projects, skills, certifications, activities, and background across software engineering, information technology, and cybersecurity.

I built the website from the ground up with HTML, CSS, and JavaScript and deployed it through GitHub Pages with a custom domain and HTTPS.

🌐 **Live Website:** [danieljberg.com](https://danieljberg.com)

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- EmailJS
- Git & GitHub
- GitHub Pages
- Custom Domain
- HTTPS
- Visual Studio Code

---

## 🎨 1. Design My Portfolio

I built the website as a central place to present my experience, projects, technical skills, certifications, and continued development.

The website includes sections for:

- Home
- About
- Experience
- Education
- Skills
- Projects
- Certifications
- Activities
- Contact

I created a custom visual style using a brown, gold, and cream color palette with consistent typography, cards, buttons, tags, and section layouts.

Rather than using a website builder or portfolio template, I created the structure and styling directly with HTML and CSS.

### Desktop

![Personal Portfolio Desktop View](assets/images/home/home-view.png)

---

## 📱 2. Build the Responsive Layout

I designed the website to work across desktop, intermediate, and mobile screen sizes.

As the screen gets smaller, the layout adjusts its:

- Navigation
- Content positioning
- Project and experience cards
- Images
- Typography
- Spacing
- Buttons
- Forms

The desktop navigation changes to a hamburger menu on smaller screens so the site remains easy to use across different devices.

### Responsive

![Personal Portfolio Responsive View](assets/images/home/home-responsive.png)

### Mobile

![Personal Portfolio Mobile View](assets/images/home/home-view-mobile.png)

---

## ⚙️ 3. Add Website Interactions

I used JavaScript to handle the interactive parts of the website.

The site includes:

- Responsive navigation
- Mobile hamburger menu
- Active navigation states
- Section navigation
- Interactive buttons and links
- Contact form behavior
- Success and error messages

I also included keyboard focus states and reduced-motion support to improve accessibility.

---

## 💼 4. Showcase My Experience and Projects

I created dedicated sections to organize my professional experience and technical projects in a way that is easy to browse.

My projects cover multiple areas, including:

- Software engineering
- Web development
- Information technology
- Cloud infrastructure
- Networking
- Cybersecurity

Each project card highlights the project, the technologies involved, and provides access to additional information or its GitHub repository when available.

I also created separate sections for my technical skills, education, certifications, and activities so the website provides a broader view of my background.

---

## 📬 5. Connect the Contact Form

I connected the contact form to **EmailJS** so visitors can send me a message directly through the website without requiring a custom backend server.

The form collects:

- Name
- Email
- Subject
- Message

JavaScript handles the submission and displays a success or error message depending on the result.

```text
Visitor
   │
   ▼
Contact Form
   │
   ▼
EmailJS
   │
   ▼
My Email
```

---

## 📄 6. Add Resume Access

I added my resume to the website as a PDF so recruiters and other visitors can easily access it.

The resume is stored at:

```text
assets/documents/resume.pdf
```

This keeps the resume with the project's other assets while separating documents from images and website icons.

---

## 🔎 7. Add Search Engine Files

I added several files to help search engines identify and navigate the website.

These include:

```text
robots.txt
sitemap.xml
```

The site also includes favicon and web manifest files for browser icons and site metadata.

---

## 🌐 8. Deploy the Website

Once the website was ready, I pushed the project to GitHub and deployed it using GitHub Pages.

The deployment flow is:

```text
Local Development
       │
       ▼
      Git
       │
       ▼
     GitHub
       │
       ▼
 GitHub Pages
       │
       ▼
 Custom Domain
       │
       ▼
danieljberg.com
```

I connected my custom domain and configured HTTPS so the finished website could be securely accessed through:

**[danieljberg.com](https://danieljberg.com)**

---

## 🧠 What I Learned

Building and continuing to improve my portfolio has given me experience managing a complete website from development through deployment.

I practiced:

- Building a website from scratch with HTML, CSS, and JavaScript
- Creating a consistent visual design across multiple sections
- Building responsive layouts for different screen sizes
- Using JavaScript for navigation and interface behavior
- Creating a mobile navigation system
- Organizing professional and technical information for a portfolio
- Integrating a contact form with EmailJS
- Organizing images, documents, and website assets
- Using Git and GitHub to manage changes
- Deploying a website with GitHub Pages
- Connecting a custom domain and HTTPS
- Adding basic search engine files such as `robots.txt` and `sitemap.xml`

The biggest takeaway was learning how to build and maintain a complete website that I can continue updating as my experience, skills, and projects grow.

---

## 📁 Repository Structure

```text
personal-portfolio-website/
│
├── assets/
│   ├── documents/
│   │   └── resume.pdf
│   │
│   ├── favicons/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   │
│   └── images/
│       ├── about/
│       ├── activities/
│       ├── certs/
│       ├── education/
│       ├── experience/
│       ├── home/
│       ├── projects/
│       └── x-logo.png
│
├── CNAME
├── README.md
├── index.html
├── robots.txt
├── script.js
├── site.webmanifest
├── sitemap.xml
└── style.css
```
