import useDocumentMeta from "../../hooks/useDocumentMeta.js";
import "./PrivacyNotice.css";

// Correo exclusivo para solicitudes ARCO. No es un canal de contacto del
// sitio, por eso vive aquí y no en `contact` de siteConfig.js.
const ARCO_EMAIL = "javiercotaops@gmail.com";

function PrivacyNotice() {
  useDocumentMeta("/aviso-de-privacidad");

  return (
    <section className="section privacy-page">
      <div className="container privacy-page__inner">
        <span className="eyebrow">Legal</span>
        <h1 className="privacy-page__title">Aviso de privacidad</h1>

        <p className="privacy-page__lead">
          Marina Moore Martinez, con domicilio en Mexicali, Baja California, es
          responsable del tratamiento y protección de los datos personales que,
          en su caso, sean recabados con motivo de la prestación de servicios de
          asesoría en seguros y productos de protección financiera.
        </p>

        <div className="privacy-page__content">
          <section className="privacy-page__section">
            <h2>1. Datos personales que pueden ser tratados</h2>
            <p>
              A través del sitio web no se solicita al usuario el llenado de
              formularios ni la entrega directa de datos personales.
            </p>
            <p>
              Cuando una persona decide contactar a Marina Moore por WhatsApp,
              llamada telefónica u otro medio de contacto disponible, podrán
              recabarse datos de identificación y contacto, tales como nombre,
              teléfono, correo electrónico y cualquier otro dato que la persona
              proporcione voluntariamente durante la conversación o proceso de
              asesoría.
            </p>
            <p>
              Dependiendo del producto o servicio solicitado, y únicamente cuando
              resulte necesario para la cotización, evaluación o contratación
              correspondiente, podrán recabarse datos personales adicionales.
            </p>
            <p>
              En productos relacionados con seguros de salud, incluyendo Gastos
              Médicos Mayores, puede ser necesario tratar datos personales
              sensibles relacionados con el estado de salud, antecedentes médicos
              u otra información requerida por la aseguradora para evaluar o
              formalizar la contratación del seguro.
            </p>
            <p>
              El tratamiento de estos datos sensibles se limitará a lo necesario
              para la finalidad correspondiente.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>2. Finalidades del tratamiento</h2>
            <p>Los datos personales podrán ser utilizados para las siguientes finalidades:</p>
            <ul>
              <li>Atender solicitudes de información.</li>
              <li>Brindar asesoría relacionada con seguros y productos financieros.</li>
              <li>Dar seguimiento a prospectos y clientes.</li>
              <li>Elaborar o gestionar cotizaciones solicitadas.</li>
              <li>Apoyar en procesos de contratación de productos o servicios.</li>
              <li>Mantener comunicación relacionada con servicios previamente solicitados.</li>
              <li>Cumplir obligaciones derivadas de la relación de asesoría o contratación.</li>
            </ul>
            <p>
              No se utilizarán los datos personales para finalidades incompatibles
              con las aquí descritas sin obtener previamente el consentimiento
              correspondiente.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>3. Transferencias de datos</h2>
            <p>El sitio web no transfiere directamente datos personales a terceros.</p>
            <p>
              Cuando una persona decida avanzar con la cotización o contratación
              de un seguro, podrá ser necesario proporcionar información a la
              aseguradora correspondiente exclusivamente para realizar el proceso
              solicitado por la persona titular.
            </p>
            <p>
              En dichos casos, se informará al titular cuando resulte necesario
              conforme a la legislación aplicable.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>4. Derechos ARCO</h2>
            <p>
              La persona titular puede solicitar en cualquier momento el Acceso,
              Rectificación, Cancelación u Oposición respecto de sus datos
              personales.
            </p>
            <p>Para ejercer estos derechos deberá enviar una solicitud al correo:</p>
            <p>
              <a className="privacy-page__email" href={`mailto:${ARCO_EMAIL}`}>
                {ARCO_EMAIL}
              </a>
            </p>
            <p>La solicitud deberá incluir, cuando menos:</p>
            <ul>
              <li>nombre de la persona titular;</li>
              <li>medio para recibir respuesta;</li>
              <li>descripción clara del derecho que desea ejercer;</li>
              <li>información suficiente para identificar los datos relacionados con la solicitud.</li>
            </ul>
            <p>
              También podrá solicitar la revocación de su consentimiento cuando
              legalmente resulte procedente.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>5. Limitación del uso o divulgación de datos</h2>
            <p>
              La persona titular puede solicitar en cualquier momento que sus
              datos dejen de utilizarse para determinadas finalidades no
              indispensables, mediante solicitud enviada al correo señalado
              anteriormente.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>6. Tecnologías de seguimiento</h2>
            <p>
              El sitio puede utilizar herramientas tecnológicas de medición y
              análisis para conocer de manera general cómo interactúan los
              usuarios con la página, evaluar el funcionamiento del sitio y medir
              la efectividad de campañas publicitarias.
            </p>
            <p>
              Estas herramientas pueden recopilar información técnica como tipo de
              navegador, dispositivo, páginas visitadas, interacciones realizadas,
              fuente de acceso y otros identificadores técnicos.
            </p>
            <p>
              En caso de utilizar herramientas como Meta Pixel, Google Analytics u
              otras similares, su uso se reflejará en el presente aviso y en la
              configuración correspondiente del sitio.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>7. Seguridad de la información</h2>
            <p>
              Se implementarán medidas razonables para proteger los datos
              personales contra pérdida, alteración, acceso, uso o divulgación no
              autorizada.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>8. Conservación de datos</h2>
            <p>
              Los datos personales serán conservados únicamente durante el tiempo
              necesario para cumplir con las finalidades para las cuales fueron
              recabados y conforme a las obligaciones legales aplicables.
            </p>
            <p>
              En el caso de datos personales sensibles, su tratamiento se limitará
              al periodo mínimo indispensable.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2>9. Cambios al aviso de privacidad</h2>
            <p>
              El presente Aviso de Privacidad podrá actualizarse en cualquier
              momento para reflejar cambios legales, operativos o relacionados con
              los servicios ofrecidos.
            </p>
            <p>Cualquier modificación será publicada en esta misma página.</p>
          </section>
        </div>

        <p className="privacy-page__updated">Última actualización: septiembre de 2026.</p>
      </div>
    </section>
  );
}

export default PrivacyNotice;
