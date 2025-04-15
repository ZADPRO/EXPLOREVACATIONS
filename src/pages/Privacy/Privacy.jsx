import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Privacy() {
  const location = useLocation();
  const toast = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto mt-5 bg-white p-6 rounded shadow-md">

      <h2 className="text-xl font-semibold mt-2 mb-5 flex justify-center">
          PRIVACY POLICY
        </h2>
        <p>
          EXPLORE VACATIONS AG ("we") is the data controller responsible for the
          collection and processing of your personal data in connection with its
          activities. Our mission is to provide our customers with a
          comprehensive range of travel services. In this Privacy Policy, we
          explain how we process your personal data and how you can control and
          manage it. Our data processing may be covered by further data
          protection notices, such as contained in particular in the General
          (Travel) Terms and Conditions, or may arise from the circumstances or
          be regulated by law. This Privacy Policy complies with the
          requirements of Swiss data protection law and, if and to the extent
          applicable, the General Data Protection Regulation (GDPR) of the
          European Union.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          ARE YOU AFFECTED BY THIS COMMUNICATION?
        </h2>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            This Privacy Policy applies to you if you:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                are one of our customers or have a contractual relationship with
                us;
              </li>
              <li>are a fellow traveler of one of our customers.</li>
              <li>
                are interested in our products or services and therefore provide
                us with your personal data (e.g. in an agency, on our websites
                and apps or at events) so that we can contact you.
              </li>
            </ul>
          </li>
        </ul>
        <p className="mt-3">
          If you provide us with other people's personal information, please
          ensure that you inform them about the sharing of their personal
          information and request that they read this Privacy Policy. We will
          ensure that we do the same whenever possible (e.g. where the contact
          details of the person concerned are available).
        </p>
        <h2 className="text-xl font-semibold mt-6">
          HOW CAN YOU CONTROL OUR PROCESSING OF YOUR PERSONAL DATA?
        </h2>

        <p className="mt-3">
          You have rights that allow you to effectively control your personal
          data and the way we process it. Below we explain your rights in
          connection with your personal data.
        </p>

        <p className="mt-3">
          If you wish to exercise the rights listed below, please submit a
          request by email to info@explorevacations.ch or by post to the
          following address: Wallisellerstrasse 147, 8152 Glattbrugg, Zurich,
          Switzerland.
        </p>
        <p className="mt-3">
          If you have any questions about the use of your personal data under
          this Privacy Policy, please address them to the following address:
          https://explorevacations.max-idigital.ch/
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>You can request access to your personal data</li>
        </ul>
        <p className="mt-3">
          If you believe that your personal data is inaccurate or incomplete,
          you may request that such personal data be amended or completed
          accordingly. In some cases, the submission of supporting documents may
          be required.
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>You can request the deletion of your personal data</li>
          </ul>
        </p>
        <p className="mt-3">
          You can object to the processing of your personal data on the basis of
          legitimate interests
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              You can object to the processing of your personal data on the
              basis of legitimate interests
            </li>
          </ul>
        </p>
        <p className="mt-3">
          If you do not agree to processing based on a legitimate interest, you
          may object on grounds relating to your individual situation. In this
          case, please inform us in detail about the corresponding processing
          and the reasons for your objection. We will stop processing your
          personal data unless there are compelling legitimate grounds or the
          processing serves to assert, exercise or defend legal claims.
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              You can object to the processing of your personal data for direct
              marketing purposes
            </li>
          </ul>
        </p>
        <p className="mt-3">
          You have the right to object to the processing of your personal data
          for direct marketing purposes at any time. This also applies to
          profiling, insofar as it is related to such direct advertising.
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              You can request the restriction of the processing of your personal
              data
            </li>
          </ul>
        </p>
        <p className="mt-3">
          If you contest the accuracy of the personal data we use or object to
          the processing of your personal data, we will review or revise your
          request. You can request that we restrict the processing of your
          personal data while we consider your request.{" "}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>You have rights against an automated individual decision</li>
          </ul>
        </p>

        <p className="mt-3">
          In principle, you have the right not to be subject to a decision based
          solely on automated processing — including profiling — which produces
          legal effects concerning you or similarly significantly affects you.
          However, we may automate such a decision if it is necessary for the
          conclusion or performance of a contract with us, is permitted by law
          or if you have given your consent. In any case, you have the right to
          challenge the decision, to express your point of view and to request
          the intervention of a competent person with the review of the
          decision. <li> You can withdraw your consent </li>
        </p>

        <p className="mt-3">
        In those cases where processing is based on consent you have given, you can withdraw this consent at any time. <li> You can request portability of part of your personal data </li>
        </p>
        <p className="mt-3">
        You may request a copy of the personal data provided by you in a structured, commonly used and machine-readable format. If technically feasible, you may request that we transmit this copy to a third party. 
        <li>Complaint to the Federal Data Protection and Information Commissioner
        </li>
        </p>
        <p>In addition to the above rights, you can file a complaint with the relevant supervisory authority. In Switzerland, this is the Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern.</p>
     
     
  <p className="mt-2">
    In this section, we explain the purpose for which we process your personal data and the legal basis for doing so.
    First and foremost, we use your personal data to execute a contract to which you are a party or to take
    pre-contractual measures at your request. However, we may also process your personal data in order to fulfil our
    legitimate interest or those of a third party.
  </p>

  <p className="mt-2">In particular, your personal data will be processed if it is necessary for the conclusion or performance of a contract in order to:</p>
  <ul className="list-disc pl-6 space-y-2 mt-3">
    <li>conclude a (travel) contract with you. We may process personal data in order to register you as a new customer, enter into a contract and perform it with you;</li>
    <li>provide you with products and services that you have purchased under the applicable Agreement;</li>
    <li>carry out billing, invoicing and collection;</li>
    <li>provide you with services related to the preparation and implementation of a trip;</li>
    <li>for insurance purposes;</li>
    <li>provide advisory services;</li>
    <li>to be able to provide assistance in case of difficulties during the trip if necessary;</li>
    <li>To provide you with access to our digital platforms. We may process personal data when you use our digital platforms for various purposes (e.g. to manage your personal information or to gain access to travel information);</li>
    <li>to provide access to our premises and facilities. We may process personal data when you visit us at our premises to carry out appropriate access and security checks;</li>
    <li>to communicate with you. We may process personal data if you wish to contact us, if you ask us for information about our company or services, or if the contract needs to be updated;</li>
    <li>Respond to your inquiries and assist you;</li>
    <li>manage the termination of the contract.</li>
  </ul>

  <p className="mt-4">
  Where we base a processing activity on a legitimate interest, we balance that interest against your interests or fundamental rights and freedoms to ensure that they are proportionate. As part of our business as a travel provider, we also use your personal data to: </p>

  <ul className="list-disc pl-6 space-y-2 mt-3">
    <li>To develop our products and services;</li>
    <li>improve cybersecurity, manage our platforms and websites, and ensure business continuity;</li>
    <li>implementation of IT solutions;</li>
    <li>carry out maintenance of IT systems during operation;</li>
    <li>Improve the automation and efficiency of our operations and customer services (e.g., auto-populating complaints, tracking your requests, and improving your satisfaction based on personal information collected during our interactions with you, e.g., phone recordings, emails, or chats);</li>
    <li>enable the assertion of legal claims and defense in connection with legal disputes and official proceedings;</li>
    <li>Organize contests, promotions and conduct opinion polls and customer satisfaction surveys.</li>
  </ul>

  <h3 className="text-lg font-semibold mt-6">Advertising and Marketing</h3>
  <p className="mt-2">
    If you are a customer and unless you object, we may send you offers for our products and services.
    We ensure that these commercial offers relate to products or services that are relevant to your needs and complement your already availed offers.
    You can object to this at any time.
  </p>

  <h3 className="text-lg font-semibold mt-6">Consent</h3>
  <p className="mt-2">
    For certain processing of personal data, we will inform you specifically and ask for your consent.
    Of course, you can revoke your consent at any time.
  </p>

  <p className="mt-2">In particular, we ask for your consent for:</p>
  <ul className="list-disc pl-6 space-y-2 mt-3">
    <li>The transfer of particularly sensitive personal data to third parties;</li>
    <li>Tailoring our offers and products or services based on a complex profile to predict your needs and behaviour;</li>
    <li>all electronic offers for products and services that are not similar to those you have purchased or for products and services from our trusted partners.</li>
  </ul>

  <p className="mt-2">
    If necessary, we may ask you for further consent to the processing of your personal data, but this will not affect any data processing that has already taken place.
  </p>

  <h2 className="text-xl font-semibold mt-6">
  FOR WHAT PURPOSE AND ON WHAT LEGAL BASIS DO WE USE YOUR PERSONAL DATA?
</h2>
<p className="mt-2">
  <strong>Contract execution and legitimate interest</strong>
</p>

<h2 className="text-xl font-semibold mt-6">
  WHAT TYPES OF PERSONAL DATA DO WE COLLECT?
</h2>
<p className="mt-2">
  We collect and use your personal information, which is any information that identifies you or that allows you to be identified.
</p>
<p className="mt-2">
  Depending on the type of product or service we offer you and the interactions we have with you, we collect different types of personal data about you:
</p>

<ul className="list-disc pl-6 space-y-2 mt-3">
  <li>
    Contact information, (personal or professional) postal address, e-mail address, telephone number;
  </li>
  <li>
    Personal details, e.g. gender, birthday and age, marital status, nationality, passport details, etc.
  </li>
  <li>
    Lifestyle, e.g. hobbies and interests, travel;
  </li>
  <li>
    Travel details, such as travel dates, itinerary/destination, airline, hotel, price, customer preferences, information about your travel companions, frequent flyer programs, etc.;
  </li>
  <li>
    Health data, e.g. details of health-related special needs or illnesses and accidents during a trip;
  </li>
  <li>
    Financial information, e.g., payment information, credit card number, bank account information;
  </li>
  <li>
    Data about your habits and preferences, in relation to the use of our products and services (e.g. food requests);
  </li>
  <li>
    Information from our interactions with you, such as your comments, suggestions, needs collected during our exchanges with you personally in our locations and during telephone communication (conversation note or call recording), communication via email, chat, chatbot, exchange on our social media and your possible complaints.
  </li>
  <li>
    Your connection and tracking data (e.g. collected via cookies for non-advertising or analytical purposes on our websites), online services, other applications;
  </li>
  <li>
    Data about your devices (mobile phone, computer, tablet, etc.), such as IP address, technical data and unique identification data;
  </li>
  <li>
    Personalized login details or security features used to connect you to our website and apps.
  </li>
</ul>
<h2 className="text-xl font-semibold mt-6">
  FROM WHOM DO WE COLLECT PERSONAL DATA?
</h2>
<ul className="list-disc pl-6 space-y-2 mt-3">
  <li>We usually collect personal data directly from you. But we can also collect it from other sources. Sometimes we collect data from public sources:
    <ul className="list-disc pl-6 space-y-2 mt-2">
      <li>publications/databases provided by official authorities or third parties (e.g. the Swiss Official Gazette of Commerce or the Commercial Register);</li>
      <li>Legal entity or corporate client websites/appearances that contain information that you have disclosed (e.g. your own website or social media presence);</li>
      <li>public information, e.g. information from the media.</li>
    </ul>
  </li>
  <li>We also collect personal information from third parties:
    <ul className="list-disc pl-6 space-y-2 mt-2">
      <li>from our customers (e.g. as fellow travellers);</li>
      <li>from our business partners (e.g. tour operators, service providers abroad);</li>
      <li>from third parties such as credit reference agencies and anti-fraud agencies;</li>
      <li>from address search service providers who are responsible for collecting the relevant information in a lawful manner.</li>
    </ul>
  </li>
</ul>

<h2 className="text-xl font-semibold mt-6">
  WHO DO WE SHARE YOUR PERSONAL DATA WITH AND WHY?
</h2>
<p className="mt-3">
  In order to fulfill some of the purposes described in this Privacy Policy, in particular to carry out a trip, we may share your personal information with others. These can be the following:
</p>
<ul className="list-disc pl-6 space-y-2 mt-3">
  <li>Our service providers in the destination country (e.g. agencies, tour guides, hotel reservations, transfer and excursion services), transport service providers (airline, train, car rental, etc.) and accommodation providers (hotel, hostels, etc.);</li>
  <li>processors who provide services on our behalf (e.g. IT services, logistics, printing services, telecommunications, debt collection, consulting and sales, and marketing);</li>
  <li>certain regulated professions such as lawyers, notaries or accountants, where this is necessary in certain circumstances (litigation, auditing, etc.), and to our insurers;</li>
  <li>Partners to carry out advertising, market and opinion research;</li>
  <li>Partners to assist in the investigation of criminal offences (e.g. fraud), the assertion, exercise or defence of legal claims;</li>
</ul>

<h2 className="text-xl font-semibold mt-6">
  INTERNATIONAL TRANSFERS OF PERSONAL DATA
</h2>
<p className="mt-3">
  International transfers from Switzerland and the European Economic Area (EEA) to a non-EEA country (third country) may result in cross-border transfers of your personal data. In particular, you must expect your data to be transmitted to your countries of travel. But also to countries in Europe, the USA and worldwide, where the service providers and service providers we use are located.
</p>
<p className="mt-2">
  If the FDPIC or the European Commission has recognised that a third country provides an adequate level of data protection, your personal data may be transferred on this basis.
</p>
<p className="mt-2">
  For transfers to a third country whose level of protection has not been recognised as adequate by the FDPIC and the European Commission, we will either rely on an exception applicable to the situation (e.g. where the transfer is necessary for the performance of our contract with you) or apply one of the following appropriate safeguards to ensure the protection of your personal data:
</p>
<ul className="list-disc pl-6 space-y-2 mt-3">
  <li>standard contractual clauses approved by the FDPIC and the European Commission;</li>
  <li>binding corporate rules.</li>
</ul>
<p className="mt-2">
  To obtain a copy of these warranties or information on where they are available, you may submit a written request in accordance with Section 2.
</p>

<h2 className="text-xl font-semibold mt-6">
  HOW LONG DO WE KEEP YOUR PERSONAL DATA?
</h2>
<p className="mt-3">
  We will retain your personal data for as long as necessary to fulfil our contractual obligations and to comply with applicable laws and regulations, or for any other period in light of our legitimate business interests, such as proper accounting and responding to legal claims or regulatory requests.
</p>

<h2 className="text-xl font-semibold mt-6">DATA SECURITY</h2>
<p className="mt-3">
We use suitable technical and organisational security measures to protect your personal data stored by us against manipulation, partial or complete loss and against unauthorised access by third parties (e.g. encryption of data transmission, access controls, etc.). Our security measures are continuously improved in line with technological developments.
</p>


<p className="mt-2">
We take reasonable precautions to protect your information. The transmission of information via the Internet and other electronic means always involves certain security risks and we cannot guarantee the security of any information transmitted in this way.
</p>

<h2 className="text-xl font-semibold mt-6">
  HOW YOU CAN FOLLOW THE DEVELOPMENT OF THIS PRIVACY POLICY
</h2>
<p className="mt-3">
  In a world where technologies are constantly evolving, we regularly review this Privacy Policy and update it as necessary.
</p>
<p className="mt-2">
  The current version published on our website applies. We recommend that you consult the latest version of this document online. We will notify you of any changes through our website or through our usual communication channels.
</p>

<h2 className="text-xl font-semibold mt-6">
  ----------
</h2>
<p className="mt-3">
  Our app is for the Taxi Driver app. Based on their current location, our system finds the nearest driver and sends him the request for a ride. For this reason, we need to continuously sense the driver's location and update the latest site in our system.
</p>
<p className="mt-2">
  Even if the Driver kills the app, we need to get the latest location of the driver in our system. So to update it we are sending driver location to our system using background service even if the app is in the background.
</p>

<h3 className="text-lg font-semibold mt-4">– Information Collection and Use</h3>
<p className="mt-2">
  By using the Apps, you agree to the collection and use of information following this policy.
</p>

<h3 className="text-lg font-semibold mt-4">Information Collection And Use</h3>
<ul className="list-disc pl-6 space-y-2 mt-2">
  <li>Name</li>
  <li>Email Address</li>
  <li>Phone Number</li>
  <li>Gender</li>
  <li>Profile Image</li>
</ul>

<h3 className="text-lg font-semibold mt-4">How We Use Your Information</h3>
<ul className="list-disc pl-6 space-y-2 mt-2">
  <li>Phone Number: To log in or register phone number is required.</li>
  <li>Phone Number: To send you the OTP we use the phone number.</li>
  <li>To provide and maintain our services.</li>
  <li>Email: To notify you about changes to our services.</li>
  <li>To allow you to participate in interactive features of our services.</li>
  <li>Email: To provide customer support.</li>
  <li>Email: To gather analysis or valuable information to improve our services.</li>
  <li>Gender: To monitor the usage of our services.</li>
  <li>To detect, prevent, and address technical issues.</li>
  <li>Profile Image: To show users an image on their profile that other users can identify.</li>
  <li>Name: To show the name on the profile as well as on the user can identify other users.</li>
</ul>

<h3 className="text-lg font-semibold mt-4">– Contact Information</h3>
<p className="mt-2">
  For privacy-related inquiries, contact us at:
</p>
<ul className="list-disc pl-6 space-y-2 mt-2">
  <li>Company Name: Explore Vacation AG</li>
  <li>Support Email: diestale@explorevacations.ch</li>
  <li>Phone Number: +41 763109960</li>
  <li>Developed By: https://explorevacations.max-idigital.ch/</li>
</ul>

     
      </div>
    </div>
  );
}
