// homeLogic.js ou dentro de um hook useHome
export const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};

export const formHandler = (e) => {
  e.preventDefault();
  alert("Orçamento enviado com sucesso! Entraremos em contato.");
};

// Exemplo de efeito de entrada suave (Intersection Observer)
export const setupAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fadeIn');
    });
  });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
};