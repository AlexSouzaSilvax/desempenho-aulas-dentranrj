import { Github, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-2">Desenvolvido por @alexsouzasilvax</h3>
            <p className="text-gray-400">© 2025 Todos os direitos reservados</p>
          </div>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/alexsouzasilvax"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/alexsouzasilvax"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:alexsouzasilvax@gmail.com"
              className="hover:text-gray-300"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/AlexSouzaSilvax/api-desempenho-aulas-dentranrj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Backend Repository
              </a>
              <a
                href="https://github.com/AlexSouzaSilvax/desempenho-aulas-dentranrj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Frontend Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
