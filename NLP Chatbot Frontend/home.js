document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const categoryCards = document.querySelectorAll('.category-card');
    const botAvatar = document.querySelector('.bot-avatar');
    const chatBubble = document.querySelector('.chat-bubble');
    const contactForm = document.querySelector('.contact-form');
  
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  
    // Category card click handler
    categoryCards?.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.querySelector('h2').textContent;
        console.log(`Selected category: ${category}`);
        // Add your category selection logic here
      });
    });
  
    // Contact form submission
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      // Add your form submission logic here
      
      // Reset form and show success message
      contactForm.reset();
      alert('Thank you for your message. We will get back to you soon!');
    });
  
    // Chatbot interaction
    let isChatVisible = true;
  
    botAvatar.addEventListener('click', () => {
      isChatVisible = !isChatVisible;
      chatBubble.style.display = isChatVisible ? 'block' : 'none';
    });
  
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      }
    });
  
    // Resize handler for mobile menu
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = 'none';
      }
    });
  });