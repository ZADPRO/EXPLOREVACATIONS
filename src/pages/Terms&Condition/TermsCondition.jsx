import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function TermsCondition() {
  const location = useLocation();
  const toast = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto mt-5 bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Rent A Car</h1>

        <div className="space-y-4 text-justify">
        <h2 className="text-xl font-semibold mt-6">
        Parties
          </h2>
          <li className="list-disc pl-6 space-y-2">
            The lessor is EXPLORE VACATIONS AG Schweiz with its registered office in Opfikon (hereinafter referred to as “Rental Firm”). The Hirer is the respective natural or legal person listed in the rental contract who rents a vehicle from the Rental Firm.
          </li>

          <h2 className="text-xl font-semibold mt-6">
            Conclusion and Subject Matter of the Contract
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
            The reservation/booking of the selected vehicle group made by the Hirer is a binding offer within the meaning of Art. 3 et seqq. of the Swiss Code of Obligations for the conclusion of a vehicle rental contract. The contract is concluded with the Rental Firm’s confirmation to the Hirer, which may also be done by digital means. (Conclusion of Contract).
            </li>
            <li>
            The content of the concluded contract shall be confirmed bindingly for both parties at the time of collection of the vehicle by a personal signature of the Hirer on an electronic device below the text of the contract displayed there. With this signature, the Hirer confirms to have read and understood the text of the contract together with these Ts & Cs, which are available for inspection at the rental depot or can be retrieved at <a className="text-blue-500 underline" href="https://explorevacations.max-idigital.ch/">https://explorevacations.max-idigital.ch/</a>, and expressly agrees to them.
            </li>
            <li>
            The Rental Firm reserves the right to offer a higher vehicle category in the event that the reserved vehicle category is no longer available or to decline the reservation/booking of the Hirer. If, exceptionally, the Hirer has booked a specific vehicle model, EXPLORE VACATIONS AG does not guarantee the availability of such vehicle model even if the booking has been confirmed. EXPLORE VACATIONS AG is entitled to unilaterally withdraw from the rental contract without further action and in particular without liability for damages in the event that a guaranteed vehicle model is not available.
            </li>
            <li>
            EXPLORE VACATIONS AG is furthermore entitled to withdraw from the contract without liability for damages if the Hirer does not pay the hire charges and all other fees and costs for the entire hire period in full before the start of the rental period.
            </li>
           
            <li>
            The Hirer and additional drivers may use the rental object exclusively for the agreed use.
            </li>
            <li>
            EVAG Express Service/Master Agreement With the conclusion of the Master Agreement, the present Ts & Cs shall apply to all rental contracts within the scope of the Agreement. If the EVAG Express Service is used, the rental contract between the parties comes into existence with the handover of the vehicle key to the Hirer at the EVAG counter or at the EVAG key safe. The Hirer undertakes to notify EXPLORE VACATIONS AG immediately of any changes of the details (address, credit card, etc.) specified in the Master Agreement.
            </li>
            </ul>
         
          <h2 className="text-xl font-semibold mt-6">
          Reservation Change/Cancellation by the Hirer
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>with Flexi-tariffs :</strong>
              <ul className="list-disc pl-6">
                <li>
                  Reservations may be canceled or changed free of charge anytime
                  before the Rental Start.
                </li>
                <li>
                  Changes/cancellations must be submitted in writing or via
                  email to: <br />
                  EXPLORE VACATIONS AG, Wallisellerstrasse 147, 8152 Glattbrugg,
                  Zürich, Schweiz
                  <br />
                  Call: +41 76 495 90 10
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:info@explorevacations.ch"
                    className="text-blue-600 underline"
                  >
                    info@explorevacations.ch
                  </a>
                </li>
                <li>Changes are subject to vehicle availability.</li>
              </ul>
            </li>

            <li>
              <strong>With Early Booking Tariffs (Prepaid):</strong>
              <ul className="list-disc pl-6">
                <li>
                  Booking changes are allowed before Rental Start with a CHF
                  30.00 fee.
                </li>
                <li>
                  Transnational changes under prepaid tariffs are not allowed.
                </li>
                <li>
                  No refund on advance payment for price differences or rental
                  charges.
                </li>
                <li>
                  Bookings may be canceled before Rental Start. In such cases:
                  <ul className="list-disc pl-6">
                    <li>
                      A cancellation fee of up to 3 rental days (plus
                      extras/fees/costs) is charged.
                    </li>
                    <li>
                      Any amount paid beyond the cancellation fee will be
                      refunded within 10 working days.
                    </li>
                    <li>
                      If the Hirer proves no or less cost/loss, the fee may be
                      adjusted.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              Cancellations and changes must be done online at{" "}
              <a
                href="https://explorevacations.max-idigital.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
               https://explorevacations.max-idigital.ch/
              </a>
              , by post, or in writing to:
              <ul className="list-disc pl-6">
                <li>
                  Explore Vacations AG, Wallisellerstrasse 147, 8152 Opfikon
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@explorevacations.ch"
                    className="text-blue-600 underline"
                  >
                    info@explorevacations.ch
                  </a>
                </li>
              </ul>
            </li>

            <li>
              If the reserved vehicle is not picked up at the agreed time, the
              full rental charge already paid will be retained in full..
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">
            Failure to Collect the Vehicle
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
            For bookings using the Flexi-tariff, the following applies: If the Hirer does not, for whatever reason, collect the vehicle no later than one hour after the agreed time, EXPLORE VACATIONS AG shall no longer be bound by the booking. General Rental Terms and Conditions.
            </li>
            <li>
            For bookings with the early booking tariffs (prepaid), the hire charges already paid shall not be refunded to the Hirer in the event that the reserved vehicle is not picked up or not picked up at the agreed time. The right to claim further damages is expressly reserved.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">
            Requirements in Respect of the Hirer/Additional Driver
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
            The Hirer undertakes to comply with the provisions regarding age and driving licence prescribed in Switzerland and to view the corresponding information prior to the reservation/booking on the EXPLORE VACATIONS AG website or in the depot or to make enquiries in this regard by telephone.
            </li>
            <li>
            In order to verify the validity of a driving license, the original driving license must be presented.
            </li>
            <li>
            Valid driving licences issued in non-EU countries are treated as equivalent to a Swiss driving licence, if
              <ul className="list-disc pl-6">
                <li>
                there is no valid visa for Switzerland or an EU country in the Hirer’s passport to be presented; 
                </li>
                <li>
                the Hirer has a valid visa for Switzerland or an EU country in the passport to be presented and has not yet been in Europe for longer than 6 months at the time of vehicle collection.
                </li>
              </ul>
            </li>
            <li>
              Licences not written in Latin characters require an accompanying
              international driving licence.
            </li>
            <li>
              If the Hirer or additional driver does not meet the requirements
              at the time of rental, the Rental Firm may withdraw from the
              contract and deny vehicle handover. This includes misinformation
              (e.g., incorrect age) given at booking time.
            </li>
            <li>
              The Rental Firm reserves the right to claim damages and recover
              expenses from the hire charges already paid.
            </li>
            <li>
              The vehicle may only be driven by the Hirer. If additional drivers
              are specified, they must also meet the same requirements. If not,
              they are prohibited from driving. This does not entitle the Hirer
              to cancel or claim a refund for the additional driver fee.
            </li>
          </ul>
       

  <h2 className="text-xl font-semibold mt-6" >Handover of the Vehicle/Rental Start</h2>
  <li>The handover of the vehicle/Rental Start can only take place during the opening times of the relevant hire depot unless an “out of hour rental” or delivery of the vehicle to the address of the Hirer can be arranged.</li>

<li>
  The Hirer has an obligation to present the following documents when hiring the vehicle:
  <ul className="list-disc pl-6 space-y-1">
    <li>a valid driving license and, if required, an international driving licence (see Clause 5);</li>
    <li>valid means of payment in accordance with Clause 9;</li>
    <li>a passport valid for at least three months beyond the end of the hire contract or a Swiss identity card or a respective identity card of an EU country.</li>
    <li>another identity document showing the currently valid residential address if such address is not shown in the document in accordance with c above, or verifiable other information on the current residential address.</li>
  </ul>
</li>
<li>
  If one of these documents is not available, the Rental Firm has the right to refuse the handover of the vehicle without any further action as well as withdraw from the contract. In this case, the Rental Firm reserves the right to recover damages for its expenses incurred from the hire charges already paid.
</li>
<li>
  If the Hirer collects the vehicle after the agreed time, the proportion of the hire charge relating to the period not utilised is still owed to the Rental Firm.
</li>
<li>
  Vehicles shall be handed over to the Hirer in an operationally safe condition, with a full tank or in the case of an electric vehicle, with a charge level of at least 80%. At the Rental Start, the Hirer must satisfy himself/herself as to the correctness of the mileage and fuel level of the vehicle stated by the Rental Firm and as to the complete and correct recording of accidents and other preexisting damage to the vehicle as well as any missing equipment (namely missing vehicle documents, insurance certificate, tools, spare wheel, warning triangle, first-aid kit or, in the case of electric vehicles, charging cable or charging accessories) and notify the Rental Firm immediately of any discrepancies. In the absence of such notification, the vehicle shall in each case be deemed to have been handed over in the due condition.
</li>

  <h2 className="text-xl font-semibold mt-6" >Security Deposit</h2><br />
  The Hirer has an obligation to provide a security deposit at the start of the rental period in order to ensure any claims by EXPLORE VACATIONS AG arising out of or in connection with the rental contract. The amount of the security deposit is dependent on the vehicle group of the hired vehicle and is stipulated in the rental contract. Enquiries about the vehicle group and the security deposit due may be made at any time online at  <a
                href="https://explorevacations.max-idigital.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
               https://explorevacations.max-idigital.ch/
              </a> by telephone, or at any EVAG depot. In any event, however, only the vehicle group agreed in the rental contract and the security deposit specified there shall be binding.
<li>
  EXPLORE VACATIONS AG is entitled to use the safety deposit to offset any claims against the Hirer arising from or in connection with the rental contract. If such offsetting does not occur, the safety deposit will be refunded or credited to the Hirer after the vehicle has been returned.
</li>
<li>
  EXPLORE VACATIONS AG does not have any obligation to keep the security deposit separate from its assets. The safety deposit does not accrue any interest. EXPLORE VACATIONS AG is entitled to demand payment of the security deposit even after the rental period has commenced.
</li>


  <h2 className="text-xl font-semibold mt-6" >Hire Charge</h2><br />
 <li> The hire charge is essentially the tariff agreed in the rental contract together with further fees and expenses. With the conclusion of this rental contract, the Hirer confirms that he/she has acknowledged these charges, fees, and costs and expressly agrees to them (incl. mileage limit, charges for extras such as additional accessories, additional driver’s charges, costs of a limitation of liability in accordance with Clauses 15.5 et seqq. below, charges for delivery and collection service, etc.).
 </li>
<li>
  All fuel costs shall be borne by the Hirer. If the vehicle is not returned with a full tank or, in the case of an electric vehicle, with a charge level of at least 80%, the refuelling or recharging is invoiced at the average market price for fuel/electricity plus a refuelling fee. Information on the current fee can be requested at the rental depot or checked at  <a
                href="https://explorevacations.max-idigital.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
               https://explorevacations.max-idigital.ch/
              </a> at any time.
</li>
<li>
  The rental contract stipulates a specific depot for the return of the vehicle at the end of the rental period. If the vehicle is returned to a different location or later than the agreed time of return, a charge of CHF 50.00 (incl. VAT) is due. This charge will be levied in addition to any one-way rental charge.
</li>


  <h2 className="text-xl font-semibold mt-6">Payment Terms and Electronic Invoicing</h2>

<li>
  <strong>Payment method</strong><br />
  Payment can be made with valid means of payment such as a credit card (an internationally accepted credit card company, namely American Express, Diners Club, Eurocard/Mastercard, and Visa), debit card, or Maestro card. Pre-paid cards such as, for example, Visa Electron, are not accepted. For bookings made at prepaid rates, it is not possible to apply vouchers or any other credits during or after the booking unless the conditions shown on the voucher explicitly permit the redemption of the voucher value in bookings made at prepaid rates and if the voucher value is immediately applied during the booking.
</li>
<li>
  <strong>Payment due date</strong><br />
  When booking a flexi-tariff or unless expressly agreed otherwise, the hire charge, all other agreed charges and the security deposit shall be debited to the Hirer’s means of payment at the Rental Start. When booking an early booking tariff (prepaid tariff), the means of payment will be debited immediately after the booking with the hire charge in accordance with Clause 8 above as well as all other services booked early. 
</li>
<li>
  <strong>Authorisation for debiting the means of payment</strong><br />
  The Hirer authorises EXPLORE VACATIONS AG as well as their collection agents irrevocably, upon conclusion of the contract, to debit all costs of car hire and all other claims of EXPLORE VACATIONS AG in connection with the rental contract (in particular also fines, fees, reimbursement for expenses, and other costs charged to the Rental Firm or its bodies due to traffic rule violations by the Hirer; see Clause13.2 and Clause 13.3 below) as well as any claims for damages in accordance with Clause 15 below from the means of payment specified by the Hirer at the conclusion of the rental contract or subsequently presented or additionally specified by the Hirer.
</li>
<li>
  The hire charge (except in the case of early-booking tariff) and the security deposit must be secured at the time of vehicle handover, and, in the case of long-term hire, monthly in advance, by means of approval by the bank processing the payment. If the approval is not issued, EXPLORE VACATIONS AG has the right to refuse the handover of the vehicle. If the vehicle has already been handed over and the approval is not issued for the following month, the Hirer shall be in default of his/her payment obligations. In this case, EXPLORE VACATIONS AG shall be entitled to terminate the rental contract without notice after setting a one-off payment deadline without success.
</li>

<li>
  <strong>Electronic invoicing</strong><br />
  The Hirer agrees that he/she will not receive any paper invoices and that the Rental Firm will instead send an electronic invoice that complies with the legal requirements to the email address provided.
</li>
<li>
  The Hirer is responsible for ensuring that he/she can receive the electronic invoices or, subject to agreement, that they are collected in electronic form. The Hirer shall be responsible for any faults in the reception equipment or other circumstances that prevent access. An invoice is deemed as received as soon as it has arrived in the domain of the Hirer. If the Rental Firm only sends a notification and the Hirer can retrieve the invoice himself/herself, or the Rental Firm provides the invoice for retrieval, the invoice is deemed as received when it has been retrieved by the Hirer. The Hirer has an obligation to retrieve the invoices provided at reasonable intervals.
</li>
<li>
  The Hirer may revoke the sole sending of invoices in electronic form at any time. In this event, the Rental Firm shall provide the Hirer with the invoice in paper form. In this case, the Hirer shall bear the additional costs for sending the invoice in paper form and for the postage for doing so.
</li>

<h2 className="text-xl font-semibold mt-6">Use of the Vehicle</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>The Hirer has an obligation (i) to drive and treat the vehicle with care and to comply with the operating instructions stipulated by the manufacturer or the Rental Firm; (ii) to lock the vehicle when it is not in use, in particular, the windows, roof openings, as well as the bonnet; (iii) to use the vehicle only in the permitted countries and in compliance with the legal provisions in those countries; (iv) to use the vehicle only for legally permissible purposes, and (v) to interrupt the journey if a defect occurs in the vehicle, as soon as this is possible without danger, and subsequently notify the Rental Firm without delay.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Restrictions of Use</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>It is prohibited to use the vehicle (i) for races, skidding courses, driving courses or similar, and as a driving school vehicle; (ii) as a recovery vehicle, towing vehicle, or for shunting; (iii) using false personal details such as age, name, address, etc.; (iv) under the influence of alcohol, drugs, medication, and stimulants; (v) in overloaded or unroadworthy condition; (vi) for journeys off surfaced roads or paths and for the passage of riverbeds or similar (in particular also in the case of vehicles with 4×4 drive); (vii) for transporting flammable, toxic, or dangerous substances.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Maintenance</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>The Hirer undertakes to regularly check the levels of oil, AdBlue, and water, as well as the tyre pressure and to make the necessary arrangements. The lessee shall strictly comply with the manuals for the electric or hybrid vehicle to be charged and for any equipment or accessory used (e.g. charging cable), as well as with any instructions concerning the use of the charging stations that are displayed at the charging station. The use of charging cables or other equipment or accessories that (i) have not been certified in accordance with applicable laws and regulations (e.g. CE certification), (ii) are not approved for the respective car or the charging station according to the instructions displayed there or (iii) are damaged is strictly prohibited. If claims are made against us by the operator of the charging station due to improper use or damage to the charging station, we will pass this on to the hirer accordingly. A public parking space must be made available as soon as the charging process is complete or the maximum permitted parking time has been reached. Costs incurred by EVAG due to exceeding the maximum charging and/or parking time, as well as any costs incurred by EVAG for fines or for using towing services, for example, due to illegal parking, will be passed on to the hirer.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Repairs</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>Repairs during the hire period should, whenever possible, be carried out by the nearest brand representation.</li>
  <li>Should the repair costs exceed CHF 200.00, the Rental Firm is to be consulted in advance for the purpose of obtaining approval for costs.</li>
  <li>The Rental Firm shall refund the repair costs subject to approval for costs and presentation of the receipt.</li>
  <li>All cases in which the Hirer is liable for the costs, e.g. on the basis of Clause 15.6 of these Ts & Cs are excluded from this.</li>
  <li>Parts that have been exchanged must be handed over by the Hirer to the Rental Firm.</li>
</ul>
<h2 className="text-xl font-semibold mt-6">Limited Liability of the Rental Firm</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>Any liability of the Rental Firm for itself and the agents employed by it vis-à-vis the Hirer and any additional drivers for any kind of contractual and/or non-contractual personal injury and/or damage to property is expressly excluded to the extent permitted by law, including liability for indirect and/or consequential damage, for loss of profit, consequential damage caused by defects, damage caused by delay, inability to use the vehicle, missed connections and opportunities to carry out business transactions, etc.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Duties of Care and Duty of Disclosure of the Hirer</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>In the event of an accident, theft, fire, damage caused by game, or other damage to the vehicle, the Hirer must notify the Rental Firm without delay and do everything that is necessary and beneficial to clarify the facts of the case and mitigate the damage.</li>
  <li>In particular, the Hirer must immediately report every accident to the police and involve the police. This also applies to minor damage and accidents that are due to the Hirer’s fault without the involvement of third parties.</li>
  <li>If the police refuse to record the accident details, the Hirer must report this immediately to the Rental Firm and provide evidence of this.</li>
  <li>The Hirer is prohibited from recognising or satisfying a claim in whole or in part unless the Hirer’s refusal to recognise or satisfy would evidently be grossly unreasonable in the circumstances.</li>
  <li>The Hirer has an obligation to notify EXPLORE VACATIONS AG immediately by email (https://explorevacations.max-idigital.ch/) of the revocation of their driving licence as well as all circumstances restricting their driving licence (for example, restriction of the driving licence, temporary seizure or confiscation of the driving licence or a judicial or official driving ban).</li>
  <li>If one of these circumstances arises, the Hirer is prohibited from continuing the hire of a vehicle, or the entitlement to drive a hired vehicle ends or is suspended with immediate effect.</li>
  <li>In the event of a breach of the Hirer’s duties in accordance with Clauses 12.1 and/or 12.2, the Hirer shall become fully liable without further notice for any damage in connection with the aforementioned circumstances, whereby any limitation of liability or insurance taken out shall cease to apply (see Clause 15.6 below).</li>
  <li>The Hirer hereby authorises the Rental Firm to inspect police and/or official files in the event of a claim.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Violation of Traffic Regulations</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>The Hirer has an obligation to comply with all traffic regulations and to inform himself/herself about any special traffic regulations applicable in the country of rental or in the countries passed through during the journey.</li>
  <li>The Hirer is solely responsible for all breaches of the law caused by the rented vehicle, namely against the Road Traffic Act, until the vehicle is returned (even if committed, for instance, by an additional driver).</li>
  <li>Should the Rental Firm be held liable for this on the basis of owner liability or for other reasons, EXPLORE VACATIONS AG shall be entitled to charge any fines, fees, costs etc. incurred to the Hirer in an appropriate manner.</li>
  <li>As the keeper of the rented vehicle, the Rental Firm has a legal obligation to report the personal data of the driver or hirer of the vehicle to the authorities in the event of any traffic offences.</li>
  <li>The Hirer undertakes in such case to pay a fee of CHF 40.00 to the Rental Firm for its administrative expenses.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">Journeys Abroad and Entry Restrictions</h2>
<ul className="list-disc pl-6 space-y-2">
  <li>If, during the handover of the vehicle, the Hirer receives special instructions or conditions from the Rental Firm regarding customs, customs declaration obligations, and/or conduct when crossing borders or regarding the place of return, the Hirer must strictly comply with these.</li>
  <li>If, for any reason, the Hirer is not able to comply with the instructions received, he/she must immediately notify the Rental Firm of this.</li>
  <li>Should the Hirer breach these provisions, he/she shall be liable to compensate the Rental Firm for any resulting damage, in particular for customs duties, import duties, and fines.</li>
  <li>Depending on the vehicle category and individual booking terms, rental vehicles may not be taken into certain countries. The applicable restrictions are stated in the rental agreement.</li>
</ul>
<h2 className="text-xl font-semibold mt-6">Liability, Limitation of Liability, Protection Options</h2>
<ul className="list-disc pl-6 space-y-2">
  <li><strong>Liability of the Hirer to the Rental Firm:</strong> The Hirer is liable, irrespective of culpability, for any damage to, destruction, or loss of the vehicle (e.g., theft). This includes conduct by additional drivers or helpers invited by the Hirer. Multiple Hirers are jointly and severally liable. A liability limitation agreement may reduce the Hirer's responsibility (see Clause 15.5).</li>
  
  <li><strong>Scope of Liability:</strong> Hirer’s liability includes:
    <ul className="list-disc pl-6">
      <li>In addition to the actual damage (e.g. diminution in value of the vehicle or repair costs, both taking into account a reasonable reduction in value, transport, liability excess and bonus loss), the liability of the Hirer to pay damages shall include the costs of an expert opinion and a processing fee of CHF 180.00 per claim. In the event of a total loss, the Hirer is also liable for the fixed fee of CHF 320.00 for registration and deregistration.</li>
    <li>In the event of loss or damage to the charging cable for e-vehicles, the Hirer shall reimburse the Rental Firm for the costs of replacing the cable as well as the processing fee in accordance with the preceding paragraph. The Rental Firm is entitled to claim further damages. In the event of damage, the Rental Firm shall be entitled to have the cause, extent and cost of the damage determined by an independent expert appointed by it at the expense of the Hirer. The Hirer agrees that the findings and the damage assessment of such an expert opinion shall be used as a basis for the settlement of the claim with binding effect for him/her in the sense of Art. 189 ZPO (Code of Civil Procedure). If the vehicle cannot be used by the Rental Firm as a result of damage, the Rental Firm may charge for the loss of use for the duration of the repair at the rates agreed with the Hirer for the actual hire.</li>
    <li>In the event of a total loss, a lump sum for one week’s loss of use will be charged. EXPLORE VACATIONS AG shall invoice the Hirer for any damage for which the Hirer is responsible, such invoice being payable within 7 days. If the compensation payment is not made in due time, a reminder fee of CHF 18.00 will be charged from the first reminder onwards. All further costs incurred in connection with the collection of the compensation claim shall also be borne by the Hirer.</li>
    </ul>
  </li>

  <li><strong>Liability Insurance for Third-Party Damages:</strong> 

  <ul>
    <li>The Hirer and every authorised driver are insured under a motor vehicle liability insurance policy. This liability insurance covers personal injury and material damage suffered by third parties up to a maximum sum insured in the amount of CHF 100,000,000 and is limited to Europe.</li>

  </ul>
  </li>
  <li><strong>Personal auto policy (PAP)</strong> 

<ul>
  <li>The additional conclusion of personal auto insurance (PAP) provides the Hirer with protection for personal injuries to the Hirer or other occupants of the rented vehicle as a result of an accident. The sum insured of the PAP is: CHF 40,000 in the event of disability, CHF 20,000 in the event of death, and unlimited medical expenses (limited to a max. of 5 years).</li>

</ul>
</li>

  
  <li><strong>Liability Limit for Vehicle Damage/Theft:</strong> </li>
  
 <li>
  <ul>
    <li>
    At the Rental Start, the Hirer may limit his/her liability towards the Rental Firm for damage to the vehicle, destruction of the vehicle, and theft to a policy excess by taking out a liability limitation and theft protection policy. With the payment of a special fee, a reduction or the complete release from the policy excess can additionally be agreed. The amount of the policy excess arises from the Rental Firm’s tariff list in force at the time of conclusion of the contract for each vehicle class and is expressly stated in the rental contract. The agreed policy excess is owed per claim and in the event of several claims during the hire period, is applied several times.
    <li>By paying a further fee, an “Interior” protection package can be purchased that goes beyond the protection of the limitation of liability in accordance with the preceding paragraph. With the purchase and payment of this protection package, there is no liability for: Damage and soiling of the interiors of a loading space/luggage compartment/top box during the operation of the vehicle as well as for the loading and unloading of the vehicle;</li>
    <li>Damage and soiling of the vehicle interior or the interior of the driver’s cab and/or passenger compartment arising from the ordinary operation of the vehicle. The cases of exclusion or discontinuation of the limitation of liability in accordance with Clause 15.6 below shall remain reserved.</li>
    </li>
  </ul>

  <li>Exclusion or discontinuation of limitation of liability or insurance cover Intentional or grossly negligent (see Clause 15.7 below) cause of damage, irrespective of the type of the resulting damage, leads to the discontinuation of a concluded liability limitation and insurance cover in every case according to Clauses 0, 15.4 and 15.5 above and thus to the unlimited liability of the Hirer to the Rental Firm and third parties for all damage in connection with the Rental Contract.</li>
  <li>Then, irrespective of fault, a concluded liability limitation or insurance cover shall NOT apply in the following cases either and the Hirer shall be liable to the Rental Firm and third parties without limitation for the full damage: </li>
  <li><ul><li>in the event of incorrect refuelling, improper use of snow chains, ski and luggage racks, careless loading of ski and luggage racks, careless use of the interior of the vehicle (cigarette holes, tears and stains in the upholstery or on other interior furnishings), consequences of driving off surfaced roads or paths, incorrect handling of convertible tops, failure to close the top in rain, wind etc.; </li>
  <li>in the case of insufficient service/insufficient maintenance of the vehicle during the hire period; </li>
  <li>in the event of roof damage and other damage resulting from failure to observe the maximum height and width of the vehicle when driving through passages, entrances, tunnels, bridges, etc.;</li>
  <li>damage (e.g. to clutch, gearbox, suspension) due to obvious incorrect operation of the vehicle (e.g. incorrect operation of the automatic gearbox and incorrect handling of 4×4 vehicles); </li>
  <li>in the event of transporting prohibited or dangerous goods;  in the event of non-compliance by the Hirer with the obligations set out in the Rental Contract and the General Rental Terms and Conditions (usage regulations in accordance with Clause 10 above, duties of care and disclosure in accordance with Clause 12 above, in particular driving a vehicle without a valid driving licence) as well as the transfer of the vehicle to an unauthorised third party or a third party not in possession of a valid driver’s licence;  in the event of non-compliance with legal regulations regarding the duty of disclosure at border crossings as well as customs and import regulations;  in the event of prevention of a measure ordered by the police to determine incapacity to drive (Art. 91a (1) SVG (Act on Road Transport) </li>
  <li>for service and/or repair costs of the following self-inflicted events: loss of keys, locking the keys in the vehicle, immobilisation due to lack of fuel, jump starting when the battery is flat, getting stuck; unless the Hirer has taken out a special mobility service with the Rental Firm that extends beyond the general limitation of liability. The respective mobility services can only be used with EVAG 24-hour roadside assistance. This also determines the type and scope of the services with the aim of keeping the Hirer mobile. If the Hirer calls in other persons for the mobility service, EXPLORE VACATIONS AG is not responsible for this and the Hirer is fully liable for any damage to the rented vehicle caused by them.</li></ul>
  
  <li>Gross negligence The parties define grossly negligent conduct, which, in accordance with Clause 15.6, even if a limitation of liability or insurance policy has been taken out, gives rise to the full and unlimited liability of the Hirer to the Rental Firm or third parties, in particular, but not exclusively:</li>
  <ul><li>any serious violation of traffic regulations within the meaning of Art. 90 (2) SVG (Act on Road Transport); 
any manner of driving in which the driver is aware of the general dangerous nature of his or her driving in breach of traffic regulations or, in breach of his or her duty, has not even taken this into consideration, 
any manner of driving in which the driver acts in breach of basic precautionary principles and thereby disregards what should have been obvious to any reasonable person in the same position and under the same circumstances in order to avoid any damage or injury that is foreseeable in the ordinary course of events; 
any driving while intoxicated, under the influence of narcotic drugs or medication that impairs the ability to drive; 
any driving in an overtired state, during microsleep or events of falling asleep; 
the following breaches of traffic regulations, insofar as they have led to or contributed to an accident: excessive speed or speed not adapted to the conditions, failure to control the vehicle, insufficient distance when driving behind other vehicles, failure to observe overtaking prohibitions and stop roads as well as failure to observe traffic signals, failure to observe the permitted direction of travel, inattentiveness and distraction at the wheel, e.g. due to the operation of mobile telephones, radios or navigation devices, etc., deactivation of safety-relevant vehicle equipment such as ABS and ESP as well as other driving stability devices, driving the vehicle in a condition that is not in accordance with the regulations and safe to operate (e.g. insufficient securing of a load, insufficient cleaning of the vehicle windows of snow, ice, or dirt, etc.);
inadequate vehicle securing (e.g. failure to apply the handbrake when parking the vehicle on slopes, failure to lock the vehicle, leaving key inserted);
leaving valuables in the vehicle.</li></ul>
  
  </li>
 </li>



</ul>
<h2 className="text-xl font-semibold mt-6">
Return of the Vehicle
</h2>
<ul className="list-disc pl-6 space-y-2"><li>The Hirer undertakes to return the vehicle in accordance with the details stipulated in the Rental Contract regarding the place, date and time of return or, in the event of early termination of the Rental Contract for good cause, at an earlier time at the request of the Rental Firm. If the Hirer returns the vehicle early, i.e. before the end of the agreed rental period, this shall not result in early termination of the rental contract. In the event of early return or late collection of the vehicle, the Hirer shall not be entitled to a reduction of the agreed rental price.</li>
<li>The Hirer is obliged to return the vehicle to an employee responsible for vehicle returns at the depot and at the time agreed upon, if such an employee is present. If the Hirer returns the vehicle to a depot different from the one agreed upon or at a later time than the agreed time of return, an additional charge of CHF 20.00 is due on account of the additional expense. This charge is in addition to any one-way charges or the costs of days of rental. The vehicle is deemed to have been returned to the Rental Company when it has been locked via the digital services of EXPLORE VACATIONS AG (‘virtual return”) or when the vehicle and key have been returned to and the vehicle has been checked by the Rental Company (“Registration”). In the event of a virtual return or if the vehicle is returned outside the opening hours of the depot, the Hirer remains responsible for it until it has been registered by the Rental Company. The same applies if, in the presence of an employee responsible, the Hirer leaves the depot before the vehicle has been registered.</li>
<li>If the Hirer does not return the vehicle and the vehicle key to the Rental Firm at the end of the agreed rental period, even if this is not the Hirer’s fault, the Rental Firm shall be entitled to demand compensation for use for the period of retention at least in the amount of the previously agreed hire charge. In addition, the Hirer shall be obliged to pay a lump sum of CHF 50,00 (incl. VAT) as compensation for the associated processing costs, unless the Hirer proves that the Rental Firm has incurred less expense and/or damage. The assertion of further damages is not excluded.</li>
<li>The Hirer shall return the vehicle as well as the extras in a condition corresponding to the contractual use. In the event of damage, excessive wear and tear, or soiling of the vehicle, the customer shall pay compensation for this. A concluded limitation of liability in accordance with Clause 15.5 provides no exemption from compensation for excessive wear and tear or soiling of the vehicle unless this relates to the interior when the corresponding protection package is purchased and results from the normal operation of the vehicle.</li>
<li>For rentals longer than 27 days, the Hirer bears the costs of top-up fluids (especially engine oil, AdBlue, windscreen washing liquid and anti-icing liquid) up to 8% of the (net) monthly rental charge, if these fluids need to be topped up during the rental period.</li><li>
For vehicles fitted with an AdBlue®-Tank, the renter must make sure that the AdBlue®-Tank is always sufficiently filled. The renter and its agents and representatives bear unlimited liability for any breaches of the above obligation during the rental period; the renter indemnifies EVAG against any claims against Explore Vacations AG from authorities or other third parties, especially fines or cautions, resulting from a failure to fill the AdBlue®-Tank.</li><li>
Data may be stored in the vehicle if the navigation device is used or mobile or other devices are paired with the vehicle. If the Hirer/driver wishes that the aforementioned data can no longer be accessed in the vehicle after the return of the vehicle, he/she must ensure that such data is deleted before returning the vehicle. Deletion can be carried out by resetting the vehicle’s navigation and communication systems to the factory settings. Instructions for this can be found in the operating instructions located in the glove compartment. The Rental Firm has the right to delete the aforementioned data, however,</li><li>
The Hirer has an obligation to inform EXPLORE VACATIONS AG of damage to the vehicle during the hire period immediately after such damage has occurred. As a rule, the Rental Firm makes a record of the condition of the vehicle at the time of return as part of the registration process, which must be signed by both parties, thereby providing a binding record of the vehicle’s condition. In the event of a virtual return of the vehicle or if the Hirer returns the vehicle outside the opening hours of the rental depot or if, for other reasons, no record is made of the condition of the vehicle when it is returned, EXPLORE VACATIONS AG is entitled to unilaterally record any damage, excessive wear and tear or soiling and to report this to the Hirer within a period of 3 working days after registration. In the absence of such notification, the vehicle shall be deemed to have been returned in good order, with the express exception </li><li>
After the expiry of the rental contract or after the agreed rental period has been exceeded, the Rental Firm shall be entitled to take possession of the vehicle at any time or to obtain it at the expense of the Hirer and to charge for any additional use of the rental contract.
</li><li>
 This also applies to longer-term rentals in the event that the Hirer is more than 15 days overdue with the agreed hire charges or it is foreseeable that he/she will no longer be able to meet the obligations of the rental contract.
The rental contract shall end at the agreed time. With the agreement of the Rental Firm, the contract can be extended if the Hirer requests this at least three days before the expiry of the agreed rental period. In the absence of any agreement to the contrary, the same conditions shall apply to the extended rental period as to the originally agreed rental period or the conditions adjusted to the rental period. The extension may only be made in writing to the respective depot of the Rental Firm and only by the Hirer himself/herself.</li><li>
Special rates are only valid for the period offered and require that the rental is for the full rental period agreed at the time of rental. If the agreed rental period is exceeded or shortened, the applicable rate for the entire rental period is the normal rate and not the special rate. EXPLORE VACATIONS AG expressly reserves the right to claim further damages.</li><li>
In the case of long-term rentals (rentals with an agreed rental period of more than 25 days), the Hirer has an obligation to return the vehicle when the mileage stated in the rental agreement is reached, but no later than on the last rental day stated in the rental contract. In the event that the Hirer exceeds the mileage stated in the Rental Contract by more than 100 km and/or returns the vehicle after the date stated in the Rental Contract, the Hirer shall be liable to pay a contractual penalty of CHF 850; this shall not apply insofar as the Hirer proves that the Rental Firm has suffered no loss or a smaller loss. This contractual penalty applies in addition to the normal rate for any longer rental period. If the mileage stated in the rental contract is reached, the Hirer will receive a replacement vehicle of equal value for the remaining rental period upon return of the vehicle.</li>



</ul>
<h2 className="text-xl font-semibold mt-6">
Data Protection
</h2>
<ul  className="list-disc pl-6 space-y-2">
  <li>All data EXPLORE VACATIONS AG receives from the Hirer or other data subjects involved in the rental procedure are processed in compliance with the provisions of the Swiss Data Protection Law and the EU General Data Protection Regulation (GDPR), insofar applicable.</li>
  <li>EXPLORE VACATIONS AG is expressly authorised by the customer to process, in addition to his or her general personal data, all other data contained in his/her driving licence or identification document (passport/ID) (including pictures), communication data (in particular email address), financial data (e.g. credit card data), and all other categories of personal data in accordance with our Privacy Policy (https://explorevacations.max-idigital.ch/) for the purposes stated in the Privacy Policy. The Hirer has the right to withdraw the aforementioned consent at any time. The withdrawal of consent does not affect the lawfulness of processing carried out based on consent up to the withdrawal.</li>
  
  <li>The email address shall only be used by EVAG for the purpose of offering similar goods or services to the Hirer. The Hirer may object to this use of his/her email address at any time without incurring any costs other than those for transmission in accordance with the basic rates.</li>
  <li>By providing the data, the Hirer consents to EXPLORE VACATIONS AG passing on the data within the EXPLORE Holding for the purpose of processing the transaction that is the subject of the contract, for marketing purposes and to maintain existing or future customer relationships, as well as for purposes that are expressly stated when the data is collected or are obviously related to the provision of the data.</li>
  <li>The Hirer may withdraw this consent for the disclosure of his or her data from EXPLORE VACATIONS AG at any time with respect to the future.</li>
  <li>The name, address, and rental data as well as all other information about the Hirer known to the Rental Firm will be transmitted to the respective authority in the event of justified enquiries by the authorities (e.g. in the context of traffic rule violations), and to respective third parties in the event of alleged infringement of the rights of third parties (e.g. in the event of interference with possession).</li>
</ul>
<h2 className="text-xl font-semibold mt-6">
Digital Renting
</h2>
<ul className="list-disc pl-6 space-y-2">

<li>In deviation from Clause 2.2, in the case of a digital rental (e.g. via the EXPLORE VACATIONS AG App, Mobile Check-In, etc.), the content of the concluded contract together with the displayed General Rental Terms and Conditions is confirmed by the Hirer by clicking on the corresponding buttons in the digital services of EXPLORE VACATIONS AG; the Hirer hereby declares that he/she has taken note of and understood the content of the contract and expressly agrees to it. The content of the concluded contract can be retrieved within the framework of the digital services of EXPLORE VACATIONS AG or is provided to the Hirer by email and therefore confirmed to both parties with binding effect.</li>

<li>The Hirer may not disclose the access data (e.g. login, PIN, username, password, etc.) for the services provided by EXPLORE VACATIONS AG  to third parties and must ensure that these are not accessible to third parties. To prevent third-party access to the services provided by EXPLORE VACATIONS AG, it is forbidden to make written records of access data. The loss of access data must be reported to EXPLORE VACATIONS AG immediately by email (info@explorevacations.ch). The access data is not transferrable.</li>
 
<li>In addition to Clause 12.2, the use of EXPLORE VACATIONS AG’s digital services for the rental of vehicles is prohibited if the Hirer’s driving licence is revoked or if other circumstances restricting the driving licence occur (e.g. restriction of the driving licence, temporary seizure or confiscation of the driving licence or a driving ban imposed by a court or the authorities).</li>

<li>For specific services, EXPLORE VACATIONS AG requests the Hirer at regular intervals to verify that he/she holds a valid driving licence. If the Hirer wishes to use services such as digital renting (e.g. Mobile Check-In), he/she has an obligation to present his/her driving licence to EXPLORE VACATIONS AG prior to starting the rental, corresponding to the processes specified by EXPLORE VACATIONS AG.</li>

</ul>
<h2 className="text-xl font-semibold mt-6">
Applicable Law and Place of Jurisdiction
</h2>
<ul className="list-disc pl-6 space-y-2">
<li>The rental contract is governed exclusively by Swiss law, to the exclusion of private international law.</li>
<li>The exclusive place of jurisdiction for all disputes in connection with the rental agreement between the Hirer and additional driver and the Rental Firm is Opfikon. The Rental Firm, however, remains entitled to bring an action before any other competent court.</li>
</ul>

<h2 className="text-xl font-semibold mt-6">
Invalidity or Partial Invalidity, Language
</h2>
<ul  className="list-disc pl-6 space-y-2">

  <li>Partial or complete invalidity or ineffectiveness of one or more provisions of the rental contract, including these General Rental Terms and Conditions (Ts & Cs), shall not affect the validity of the remaining provisions. Any provisions that are or have become invalid shall, in the application of the contract, be replaced by such provisions that come closest to the purpose intended by the invalid provisions. In case of contradictions, the German text of the contract is authoritative.</li>
  
</ul>

        </div>
      </div>
    </div>
  );
}
