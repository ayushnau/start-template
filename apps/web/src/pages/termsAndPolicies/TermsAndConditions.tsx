import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions: FC<{}> = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="bg-white h-full rounded-t-3xl shadow-style-chooser">
				<div className="p-6">
					<div
						className=""
						onClick={() => {
							navigate(-1);
						}}
					>
						<img src="https://wiredup-staging.imgix.net/32f292cd-9815-44bd-b5ec-4b8635e761ed?auto=compress,format" />
					</div>
					<div>
						<div className="text-black mt-6 text-2xl font-bold">
							Terms & Conditions
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							<p className="mb-10">
								Unoroof Fintech Solutions Pvt Ltd (hereinafter referred to
								as &lsquo;Unoroof&rsquo;, the &lsquo;Company&rsquo;,
								&lsquo;we&rsquo;, or &lsquo;us&rsquo;) is a private limited
								company incorporated under the Companies Act, 2013, having
								registered office at Flat No - 3701, Tower B, Lodha Bellissimo,
								Joshi Marg, Mahalaxmi Mumbai, Maharashtra 400011, India.
							</p>
							<p className="mb-10">
								Unoroof is the licensed owner of the Site (as defined below) and
								the App (as defined below). Access to and use of the Site and
								App is subject to these terms and conditions of use
								(&lsquo;Terms of Use&rsquo;). The Company develops, manages and
								operates the Site and the App. The Company provides opportunity
								to the User (as defined below) to access and avail services
								offered on the Website/App subject to the User signing-up and
								after carefully reading and accepting to abide by the Terms of
								Service, and the Privacy Policy. By continuing to use the
								app/website the User confirms that he/she had read, understood
								and agrees to these Terms of Use, Privacy Policy and other Terms
								and Conditions including any amendments thereof from to time.
								The User also confirms that he/she is eligible and competent to
								enter into such agreement with the Company. In case, the User
								disagrees or if any of the Terms of Use, Privacy Policy and
								disclaimers is not acceptable to the User, the User is free to
								not, register and avail the service from the Website/App.
							</p>
							<div className="mb-10">
								<p className="mb-5">
									1. &lsquo;Site&rsquo;/App shall include any information or
									services made available by Unoroof, regardless of the medium,
									and shall include, without limitation any affiliated websites,
									mobile applications, videos, products and applications we make
									available. We reserve the right at any time, and from time to
									time, to modify, suspend or discontinue (temporarily or
									permanently) the Site/App, or any part of the Site/App, with
									or without notice
								</p>

								<p className="mb-5">
									2. We make no claims that the Site/App or any of its content
									is appropriate outside of India. If you access the Site/App
									from outside India, you do so-on your own initiative and are
									responsible for compliance with local laws and regulations.
								</p>
							</div>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">
							DEFINITIONS
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							<p className="mb-5">
								3. <b>&lsquo;App&rsquo;</b> means the mobile application by the
								name &lsquo;WiredUp&rsquo; which is developed, managed and
								operated by the Company and is available on both - android and
								iOS platform and/or other app stores.
							</p>

							<p className="mb-5">
								4. <b>&lsquo;Website&rsquo;</b> means the website hosted as
								&lsquo; HYPERLINK &lsquo;http://www.wiredup.in&rsquo;
								www.wiredup.in&rsquo; which is developed, managed and operated
								by the Company.
							</p>

							<p className="mb-5">
								5. <b>&lsquo;Group Companies&rsquo;</b>
								 includes any company which is a holding, subsidiary or the
								fellow subsidiary, associate of the Company.
							</p>

							<p className="mb-5">
								6. &lsquo;Laws&rsquo; means all laws, ordinance, statutes,
								rules, orders, decrees, injunctions, licences, permits,
								approvals, authorizations, consents, waivers, privileges,
								agreements and regulations of any Governmental authority having
								jurisdiction over the relevant matter as such which are in
								effect as of the date hereof or as may be amended, modified,
								enacted or revoked from time to time hereafter.
							</p>

							<p className="mb-5">
								7. <b>&lsquo;Privacy Policy&rsquo;</b> means the privacy policy
								published on the Website/App.
							</p>

							<p className="mb-5">
								8. <b>&lsquo;Terms of Use&rsquo;</b> shall mean these terms and
								conditions set out herein regarding the use of the Website
								and/or the App by the User.
							</p>

							<p className="mb-10">
								9. <b>&lsquo;User&rsquo;</b> means any person who uses the
								website, downloads the App and/or includes any person who avails
								any services or facilities offered through the App or Website.
							</p>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">
							TERMS OF USE
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							{" "}
							<div>
								<p className="mb-5">
									By agreeing to the Terms of Use set out herein, the User:
								</p>

								<p className="mb-5">
									10. agrees to provide all the necessary information and
									documents to the Company and/or its Group :(i) at the time of
									registration; (ii) as and when required by applicable Law; and
									(iii) whenever there is any change in earlier provided
									information by the User.
								</p>

								<p className="mb-5">
									11. confirms that all details provided by him/her are true and
									correct and he/she will produce any documents/undertaking as
									may be required by the Company and/or its Group Companies for
									verification. User agrees to notify any updations to the
									details provided to the Company and/or its Group Companies,
									from time to time.
								</p>

								<p className="mb-5">
									12. agrees that the Company and/or its Group Companies may
									appoint service providers to carry out its obligations under
									these terms of use.
								</p>

								<p className="mb-5">
									13. agrees to keep his log-in credentials confidential, safe
									and secured. Any loss or damage incurred by the User due to
									unauthorised usage of his/her ID/password shall be borne by
									the User and the Company and/or its Group Companies shall not
									be responsible in any way.
								</p>

								<p className="mb-5">
									14. agrees that the Company and/or its Group Companies may
									collect Personal Information of the User (as defined under
									Information Technology Act, 2000 read with Information
									Technology (Reasonable Security Practices and Procedures and
									Sensitive Personal Data or Information) Rules, 2011) and the
									Company and its Group Companies may use such information for
									providing appropriate services/products to the Users.
								</p>

								<p className="mb-5">
									15. agrees that the Company may engage with third parties, to
									promote the Website/App or products and services of its Group
									Companies, through its Website/App. However, such third
									parties shall in no way be responsible for rendering of
									services/products (which are provided by the Company and/or
									its Group Companies).
								</p>

								<p className="mb-5">
									16. agrees and acknowledges that accessing the services of the
									Group Companies, through any platform operated, managed,
									developed or owned by the Company, will be subject to the
									Terms of Use set-out herein.
								</p>

								<p className="mb-5">
									17. authorizes the Company and/or its Group
									Companies/associates/vendors/business partners to record
									conversations with him/her for any purpose not limited to
									quality control, record retention however we will keep such
									records confidential.
								</p>

								<p className="mb-10">
									18. authorizes the Company and/or its Group Companies to share
									Personal Information/and/or transactional data with its Group
									Companies/associates/vendors/business partners for
									promoting/offering their product and services.
								</p>
							</div>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">DISCLAIMER</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							{" "}
							<div>
								<p className="mb-10">
									UnoRoof is not liable for any consequence, financial or
									otherwise, adverse or favourable, sustained by you, the User,
									from any action, omission to act etc. by relying on the
									contents, material or information provided in our Application.
								</p>

								<p className="mb-10">
									Professional information, legal updates, statutory information
									like notifications, circulars etc. provided through our
									Application is for informatory purpose only and is not
									advisory in nature. Any information obtained or materials
									downloaded from this Application has been done by the User
									solely at his/her option and any transmission, use of this App
									has not created or would not create any advisor-client or
									other professional relationship between UnoRoof and the User.
								</p>

								<p className="mb-10">
									The information available through the Site/App to any
									Unsubscribed User is provided solely for informational
									purposes on an &lsquo;as is&rsquo; basis at user’s sole risk.
									Unoroof makes no guarantees as to the accurateness, quality,
									or completeness of the information and Unoroof shall not be
									responsible or liable for any errors, omissions, or
									inaccuracies in the information or for any Unsubscribed User’s
									reliance on the information. User is solely responsible for
									verifying the information as being appropriate for user’s
									personal use, including without limitation, seeking the advice
									of a qualified professional regarding any specific financial
									questions a user may have. Unoroof is not endorsed by or
									affiliated with SEBI or any other financial regulatory
									authority, agency, or association.
								</p>
							</div>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">
							UNOROOF INTELLECTUAL PROPERTY
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							{" "}
							<div>
								<p>
									19. <b>Your Limited License to our Intellectual Property</b>
								</p>
								<p className="mb-10">
									The materials used and displayed on the Site/App, including
									but not limited to text, software, photographs, graphics,
									illustrations and artwork, video, music and sound, and names,
									logos, trademarks and service marks, are the property of
									Unoroof or its affiliates or licensors and are protected by
									copyright, trademark and other laws. Any such content may be
									used solely for your personal, non-commercial use. You agree
									not to modify, reproduce, retransmit, distribute, disseminate,
									sell, publish, broadcast or circulate any such material
									without the prior written permission of Unoroof. Unoroof
									grants you a personal, non-exclusive, non-transferable,
									revocable license to use the Site and any materials on the
									site for non-commercial purposes subject to these Terms of
									Use.
								</p>

								<p>
									20. <b>Unoroof Trademarks and Logos</b>
								</p>
								<p className="mb-10">
									The terms Unoroof, www.WiredUp.in and other Unoroof trademarks
									and services marks, and associated logos and all related
									names, logos, product and service names, designs and slogans
									are trademarks of Unoroof or its affiliates or licensors. You
									shall not use such marks without the prior written permission
									of Unoroof. All other names, logos, product and service names,
									designs and slogans on the Site are the trademarks of their
									respective owners.
								</p>
							</div>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">
							RELIANCE ON INFORMATION ON SITE/APP
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							{" "}
							<div>
								<p className="mb-10">
									We have no obligation to, and you should not expect us to,
									review content on our Site/App, including User Contributions
									(defined below) or contributions by our independent
									contributors.
								</p>

								<p className="mb-5">About our Contributors</p>

								<p className="mb-10">
									Unoroof seeks out content providers in particular subject
									matters as independent contractor contributors to the
									Site/App. Unoroof does not represent or guarantee that any
									contributor has any expertise or knowledge or has any specific
									qualifications or credentials, without limitation, as to the
									subject matter to which their contributions relate. To the
									extent we refer to each of these contributors as an expert,
									you must understand we rely on the information they provide us
									and we are not obligated to independently verify or attempt to
									confirm any information they provide, nor their qualifications
									or credentials. Unoroof also is not obligated to monitor or
									independently research or verify any content they contribute.
									Contributors, even if characterized as an expert, are not
									employees of Unoroof or its affiliates and Unoroof cannot and
									does not represent or warrant the accuracy, completeness or
									truthfulness of the qualifications or credentials of any
									contributor, nor of any other users of the Site/App.
								</p>

								<div>
									<div>
										<p className="mb-5">
											You may use the Site/App only for lawful purposes and in
											accordance with these Terms of Use. You agree not to use
											the Site/App:
										</p>

										<div>
											<p className="mb-5">
												1. In any way that violates any applicable federal,
												state, local or international law or regulation.
											</p>
											<p className="mb-5">
												2. For the purpose of exploiting, harming or attempting
												to exploit or harm minors in any way by exposing them to
												inappropriate content, asking for personally
												identifiable information or otherwise.
											</p>
											<p className="mb-5">
												3. To transmit, or procure the sending of, any
												advertising or promotional material, including any
												&lsquo;junk mail&rsquo;, &lsquo;chain letter&rsquo; or
												&lsquo;spam&rsquo; or any other similar solicitation.
											</p>
											<p className="mb-5">
												4. To impersonate or attempt to impersonate Unoroof, a
												Unoroof employee, another user or any other person or
												entity (including, without limitation, by using email
												addresses or screen names associated with any of the
												foregoing).
											</p>
											<p className="mb-5">
												5. To engage in any other conduct that restricts or
												inhibits anyone&#39;s use or enjoyment of the Site/App,
												or which, as determined by us, may harm Unoroof or users
												of the Site/App or expose them to liability.
											</p>
										</div>
									</div>

									<div>
										<p className="mb-5">Additionally, you agree not to:</p>

										<div>
											<p className="mb-5">
												6. &lsquo;Scrape&rsquo; or disaggregate data from the
												Site/App (whether by manual or automated means) for any
												commercial, marketing, or data compiling or enhancing
												purpose.
											</p>
											<p className="mb-5">
												7. Introduce any viruses, Trojan horses, worms, logic
												bombs or other material which is malicious or
												technologically harmful.
											</p>
											<p className="mb-5">
												8. Attempt to gain unauthorized access to, interfere
												with, damage or disrupt any parts of the Site/App, the
												server on which the Site/App is stored, or any server,
												computer or database connected to the Site/App.
											</p>
											<p className="mb-5">
												9. Otherwise attempt to interfere with the proper
												working of the Site/App.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="text-black mt-6 text-2xl font-bold">
							CONTENT THAT YOU MAKE AVAILABLE ON THE SITE/App
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							{" "}
							<div>
								<p className="mb-5">User Contributions</p>
								<p className="mb-10">
									The Site/App may contain message boards, chat rooms, personal
									web pages or profiles, forums, bulletin boards and other
									interactive features (collectively, &lsquo;Interactive
									Services&rsquo;) that allow users to post, submit, publish,
									display or transmit to other users or other persons
									(hereinafter, &lsquo;post&rsquo;) content or materials
									(collectively, &rsquo;User Contributions&rsquo;) on or through
									the Site/App.
								</p>

								<p className="mb-10">
									If you voluntarily disclose personal information (e.g., user
									name, email address) on the Site/App, such as on a forum, chat
									room or on any other user or member-generated pages, that
									information can be viewed in search engines, collected and
									used by others and may result in unsolicited contact from
									other parties. 
								</p>

								<p className="mb-10">
									Any User Contribution you post to the Site/App will be
									considered non-confidential and non-proprietary. By providing
									any User Contribution on the Site/App, you grant us and our
									affiliates and service providers, and each of their and our
									respective licensees, successors and assigns the right to use,
									reproduce, modify, perform, display, distribute and otherwise
									disclose to third parties any such material for any purpose.
								</p>

								<p className="mb-5">You represent and warrant that:</p>
								<p className="mb-10">
									You own or control all rights in and to the User Contributions
									and have the right to grant the license granted above to us
									and our affiliates and service providers, and each of their
									and our respective licensees, successors and assigns.
								</p>
								<p className="mb-10">
									All of your User Contributions do and will comply with these
									Terms of Use.
								</p>
								<p className="mb-10">
									You understand and acknowledge that you are responsible for
									any User Contributions you submit or contribute, and you, not
									the Company, have full responsibility for such content,
									including its legality, reliability, accuracy and
									appropriateness. We are not responsible, or liable to any
									third party, for the content or accuracy of any User
									Contributions posted by you or any other user of the Site/App.
								</p>
							</div>
						</div>
						<div className="text-black mt-6 text-2xl font-bold">
							CONTENT THAT YOU MAKE AVAILABLE ON THE SITE/App
						</div>
						<div className="text-gray-600 font-normal text-sm mt-1">
							<div>
								<p className="mb-5">We have the right to:</p>
								<p className="mb-10">
									Remove or refuse to post any User Contributions for any or no
									reason in our sole discretion.
								</p>

								<p className="mb-10">
									Take any action with respect to any User Contribution that we
									deem necessary or appropriate in our sole discretion,
									including if we believe that such User Contribution violates
									the Terms of Use, including the content standards below,
									infringes any intellectual property right or other right of
									any person or entity, threatens the personal safety of users
									of the Site/App or the public or could create liability for
									the Company.
								</p>

								<p className="mb-10">
									Disclose your identity or other information about you to any
									third party who claims that material posted by you violates
									their rights, including their intellectual property rights or
									their right to privacy.
								</p>

								<p className="mb-10">
									Take appropriate legal action, including without limitation,
									referral to law enforcement, for any illegal or unauthorized
									use of the Site/App.
								</p>

								<p className="mb-10">
									Terminate or suspend your access to all or part of the
									Site/App for any or no reason, including without limitation,
									any violation of these Terms of Use.
								</p>

								<p className="mb-10">
									Without limiting the foregoing, we have the right to fully
									cooperate with any law enforcement authorities or court order
									requesting or directing us to disclose the identity or other
									information related to anyone posting any materials on or
									through the Site/App. YOU WAIVE AND HOLD HARMLESS THE COMPANY
									AND ITS AFFILIATES, AGENTS, LICENSEES AND SERVICE PROVIDERS
									FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE
									FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS
									AND FROM ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS
									BY EITHER THE COMPANY/SUCH PARTIES OR LAW ENFORCEMENT
									AUTHORITIES.
								</p>

								<p className="mb-10">
									We cannot and do not undertake to review all material before
									it is posted on the Site/App, and cannot ensure prompt removal
									of objectionable material after it has been posted.
									Accordingly, we assume no liability for any action or inaction
									regarding transmissions, communications or content provided by
									any user or third party. We have no liability or
									responsibility to anyone for performance or non-performance of
									the activities described in this section.
								</p>
							</div>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						YOUR INDEMNIFICATION OF US
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-10">
								You agree to indemnify, defend and hold harmless Unoroof, and
								its officers, directors, owners, employees, agents, information
								providers, affiliates, licensors and licensees (collectively,
								the &lsquo;Indemnified Parties&rsquo;) from and against any and
								all liability and costs, including, without limitation,
								reasonable attorneys&#39; fees, incurred by the Indemnified
								Parties in connection with any claim arising out of (a) any User
								Contributions, or (b) breach by you or any user of your account
								or these Terms of Use or any representations, warranties and
								covenants contained in these Terms of Use. You shall cooperate
								fully and reasonably in the defence of any such claim. Unoroof
								reserves the right, at its own expense, to assume the exclusive
								defence and control of any matter subject to indemnification by
								you.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						WARRANTY DISCLAIMER
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-10">
								THE SITE/APP IS PROVIDED ON AN &lsquo;AS IS&rsquo; BASIS WITHOUT
								WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
								NOT LIMITED TO WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF
								MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, OTHER THAN
								THOSE WARRANTIES WHICH ARE IMPOSED BY AND INCAPABLE OF
								EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS APPLICABLE
								TO THESE TERMS OF USE. WE DO NOT ENDORSE AND ARE NOT RESPONSIBLE
								FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE OR
								STATEMENT ON THE SITE/APP. THE INFORMATION, FACTS, AND OPINIONS
								PROVIDED ARE NO SUBSTITUTE FOR PROFESSIONAL ADVICE.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						LIABILITY DISCLAIMER
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-10">
								YOUR USE OF THE SITE/APP IS AT YOUR OWN RISK. NEITHER, UNOROOF
								NOR ANY OF ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, AGENTS,
								REPRESENTATIVES OR LICENSORS (INCLUDING OUR INDEPENDENT
								CONTRACTOR CONTRIBUTORS) SHALL BE LIABLE TO YOU OR ANYONE ELSE
								FOR ANY LOSS OR INJURY OR ANY DIRECT, INDIRECT, INCIDENTAL,
								CONSEQUENTIAL, SPECIAL, PUNITIVE OR SIMILAR DAMAGES ARISING OUT
								OF YOUR ACCESS OR USE OF, OR YOUR INABILITY TO ACCESS OR USE,
								THE SITE/APP AND THE INFORMATION AVAILABLE ON THE SITE/APP OR
								ARISING OUT OF ANY ACTION TAKEN IN RESPONSE TO OR AS A RESULT OF
								ANY INFORMATION AVAILABLE ON THE SITE/APP. YOU HEREBY WAIVE ANY
								AND ALL CLAIMS AGAINST UNOROOF AND ITS SUBSIDIARIES, DIVISIONS,
								AFFILIATES, AGENTS, REPRESENTATIVES AND LICENSORS (INCLUDING OUR
								INDEPENDENT CONTRACTOR CONTRIBUTORS) ARISING OUT OF YOUR USE OF
								THE SITE AND THE INFORMATION AVAILABLE THEREON.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						THIRD PARTY LINKS, ADVERTISEMENTS, SITE/APP AND CONTENT
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-10">
								We do not review or monitor any websites, advertisements, or
								other media linked to or available through the Site/App and are
								not responsible for the content of any such third party
								advertisements or linked websites. Prior to purchasing any third
								party products or services described on the Site/App, you are
								advised to verify pricing, product quality and other information
								necessary to make an informed purchase. Neither Unoroof nor any
								of its subsidiaries, divisions, affiliates, agents,
								representatives or licensors shall have any liability arising
								from your purchases of third party products or services based
								upon the information provided on the Site/App, and we shall not
								receive or review complaints regarding such purchases.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">DISPUTES</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-5">
								These Terms of Use and any disputes arising out of or related to
								the Site/App shall be governed by, and construed and enforced in
								accordance with, the laws of India (without regard to conflict
								of law principles). In the event of any such dispute you
								irrevocably consent to exclusive jurisdiction and venue in the
								courts located Mumbai, Maharashtra.
							</p>
							<p className="mb-10">
								ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
								RELATING TO THESE TERMS OF USE OR THE SITE MUST BE COMMENCED
								WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES,
								OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM WILL BE DEEMED TO BE
								PERMANENTLY BARRED AND YOU HEREBY AGREE TO WAIVE SUCH CAUSE OF
								ACTION OR CLAIM AFTER SUCH DATE.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						WAIVER AND SEVERABILITY
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						{" "}
						<div>
							<p className="mb-5">
								No waiver by Unoroof of any term or condition set forth in these
								Terms of Use shall be deemed a further or continuing waiver of
								such term or condition or a waiver of any other term or
								condition, and any failure of Unoroof to assert a right or
								provision under these Terms of Use shall not constitute a waiver
								of such right or provision.
							</p>
							<p className="mb-10">
								If any provision of these Terms of Use is held by a court or
								other tribunal of competent jurisdiction to be invalid, illegal
								or unenforceable for any reason, such provision shall be
								eliminated or limited to the minimum extent such that the
								remaining provisions of the Terms of Use will continue in full
								force and effect.
							</p>
						</div>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						ENTIRE AGREEMENT
					</div>
					<div className="text-gray-600 font-normal text-sm mt-1">
						<div>
							<p className="mb-10">
								The Terms of Use constitute the sole and entire agreement
								between you i.e. the User and Unoroof with respect to the
								Site/App and supersede all prior and contemporaneous
								understandings, agreements, representations and warranties, both
								written and oral, with respect to the Site/App.
							</p>

							<p className="mb-5">How to Contact Us</p>
							<p className="mb-5">
								This Site/App is owned and operated by Unoroof Fintech Solutions
								Pvt Ltd located at B-1102, Peninsula Business Park, Senapati
								Bapat Marg, Lower parel, Mumbai 400013.
							</p>
							<p className="mb-5">
								All other feedback, comments, requests for technical support and
								other communications relating to the Site/App should be directed
								to:  support@unoroof.com;support@wiredup.in
							</p>
							<p className="mb-5">Thank you for visiting Unoroof.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default TermsAndConditions;
