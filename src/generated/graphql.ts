/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DID: string;
  DateTime: Date;
  JSON: string;
  LifecycleDefinition: any;
  Markdown: any;
  MessageID: any;
  NameID: string;
  UUID: string;
  UUID_NAMEID: string;
  UUID_NAMEID_EMAIL: string;
  Upload: import('graphql-upload').FileUpload;
};

export type Activity = {
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The id of the parent of the entity within which the Activity was generated. */
  parentID?: Maybe<Scalars['UUID']>;
  /** The id of the entity that is associated with this Activity. */
  resourceID: Scalars['UUID'];
  /** The id of the user that triggered this Activity. */
  triggeredBy: Scalars['UUID'];
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export enum ActivityEventType {
  CalloutPublished = 'CALLOUT_PUBLISHED',
  CanvasCreated = 'CANVAS_CREATED',
  CardComment = 'CARD_COMMENT',
  CardCreated = 'CARD_CREATED',
  DiscussionComment = 'DISCUSSION_COMMENT',
  MemberJoined = 'MEMBER_JOINED',
}

export type ActivityLogInput = {
  /** Display the activityLog results for the specified Collaboration. */
  collaborationID: Scalars['UUID'];
};

export type Actor = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The change / effort required of this actor */
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A value derived by this actor */
  value?: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  /** The set of actors in this actor group */
  actors?: Maybe<Array<Actor>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type Agent = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Credentials held by this Agent. */
  credentials?: Maybe<Array<Credential>>;
  /** The Decentralized Identifier (DID) for this Agent. */
  did?: Maybe<Scalars['DID']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Verfied Credentials for this Agent. */
  verifiedCredentials?: Maybe<Array<VerifiedCredential>>;
};

export type AgentBeginVerifiedCredentialOfferOutput = {
  /** The token containing the information about issuer, callback endpoint and the credentials offered */
  jwt: Scalars['String'];
  /** The QR Code Image to be offered on the client for scanning by a mobile wallet */
  qrCodeImg: Scalars['String'];
};

export type AgentBeginVerifiedCredentialRequestOutput = {
  /** The token containing the information about issuer, callback endpoint and the credentials offered */
  jwt: Scalars['String'];
  /** The QR Code Image to be offered on the client for scanning by a mobile wallet */
  qrCodeImg: Scalars['String'];
};

export type Application = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  /** The Questions for this application. */
  questions: Array<Question>;
  updatedDate: Scalars['DateTime'];
  /** The User for this Application. */
  user: User;
};

export type ApplicationEventInput = {
  applicationID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ApplicationForRoleResult = {
  /** ID for the Challenge being applied to, if any. Or the Challenge containing the Opportunity being applied to. */
  challengeID?: Maybe<Scalars['UUID']>;
  /** ID for the community */
  communityID: Scalars['UUID'];
  /** Date of creation */
  createdDate: Scalars['DateTime'];
  /** Display name of the community */
  displayName: Scalars['String'];
  /** ID for the ultimate containing Hub */
  hubID: Scalars['UUID'];
  /** ID for the application */
  id: Scalars['UUID'];
  /** ID for the Opportunity being applied to, if any. */
  opportunityID?: Maybe<Scalars['UUID']>;
  /** The current state of the application. */
  state: Scalars['String'];
  /** Date of last update */
  updatedDate: Scalars['DateTime'];
};

export type ApplicationTemplate = {
  /** Application template name. */
  name: Scalars['String'];
  /** Template questions. */
  questions: Array<QuestionTemplate>;
};

export type Aspect = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The banner Visual for this Aspect. */
  banner?: Maybe<Visual>;
  /** The narrow banner visual for this Aspect. */
  bannerNarrow?: Maybe<Visual>;
  /** The comments for this Aspect. */
  comments?: Maybe<Comments>;
  /** The id of the user that created this Aspect */
  createdBy: Scalars['UUID'];
  createdDate: Scalars['DateTime'];
  /** The description of this aspect */
  description: Scalars['Markdown'];
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The References for this Aspect. */
  references?: Maybe<Array<Reference>>;
  /** The set of tags for the Aspect */
  tagset?: Maybe<Tagset>;
  /** The aspect type, e.g. knowledge, idea, stakeholder persona etc. */
  type: Scalars['String'];
};

export type AspectCommentsMessageReceived = {
  /** The identifier for the Aspect. */
  aspectID: Scalars['String'];
  /** The message that has been sent. */
  message: Message;
};

export type AspectTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The default description to show to users filling our a new instance. */
  defaultDescription: Scalars['Markdown'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The meta information for this Template */
  info: TemplateInfo;
  /** The type for this Aspect. */
  type: Scalars['String'];
};

export type AssignChallengeAdminInput = {
  challengeID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignCommunityLeadOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
};

export type AssignCommunityLeadUserInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignCommunityMemberOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
};

export type AssignCommunityMemberUserInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignGlobalAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignGlobalCommunityAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignGlobalHubsAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignHubAdminInput = {
  hubID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignOpportunityAdminInput = {
  opportunityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignOrganizationAdminInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignOrganizationMemberInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignOrganizationOwnerInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AuthenticationConfig = {
  /** Alkemio Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  /** Configuration of the authenticaiton provider */
  config: AuthenticationProviderConfigUnion;
  /** Is the authentication provider enabled? */
  enabled: Scalars['Boolean'];
  /** CDN location of an icon of the authentication provider login button. */
  icon: Scalars['String'];
  /** Label of the authentication provider. */
  label: Scalars['String'];
  /** Name of the authentication provider. */
  name: Scalars['String'];
};

export type AuthenticationProviderConfigUnion = OryConfig;

export type Authorization = {
  anonymousReadAccess: Scalars['Boolean'];
  /** The set of credential rules that are contained by this Authorization Policy. */
  credentialRules?: Maybe<Array<AuthorizationPolicyRuleCredential>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The privileges granted to the current user based on this Authorization Policy. */
  myPrivileges?: Maybe<Array<AuthorizationPrivilege>>;
  /** The set of privilege rules that are contained by this Authorization Policy. */
  privilegeRules?: Maybe<Array<AuthorizationPolicyRulePrivilege>>;
  /** The set of verified credential rules that are contained by this Authorization Policy. */
  verifiedCredentialRules?: Maybe<
    Array<AuthorizationPolicyRuleVerifiedCredential>
  >;
};

export enum AuthorizationCredential {
  ChallengeAdmin = 'CHALLENGE_ADMIN',
  ChallengeLead = 'CHALLENGE_LEAD',
  ChallengeMember = 'CHALLENGE_MEMBER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalAdminCommunity = 'GLOBAL_ADMIN_COMMUNITY',
  GlobalAdminHubs = 'GLOBAL_ADMIN_HUBS',
  GlobalRegistered = 'GLOBAL_REGISTERED',
  HubAdmin = 'HUB_ADMIN',
  HubHost = 'HUB_HOST',
  HubMember = 'HUB_MEMBER',
  OpportunityAdmin = 'OPPORTUNITY_ADMIN',
  OpportunityLead = 'OPPORTUNITY_LEAD',
  OpportunityMember = 'OPPORTUNITY_MEMBER',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationMember = 'ORGANIZATION_MEMBER',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  UserGroupMember = 'USER_GROUP_MEMBER',
  UserSelfManagement = 'USER_SELF_MANAGEMENT',
}

export type AuthorizationPolicyRuleCredential = {
  grantedPrivileges: Array<AuthorizationPrivilege>;
  inheritable: Scalars['Boolean'];
  resourceID: Scalars['String'];
  type: Scalars['String'];
};

export type AuthorizationPolicyRulePrivilege = {
  grantedPrivileges: Array<AuthorizationPrivilege>;
  sourcePrivilege: Scalars['String'];
};

export type AuthorizationPolicyRuleVerifiedCredential = {
  claimRule: Scalars['String'];
  credentialName: Scalars['String'];
  grantedPrivileges: Array<AuthorizationPrivilege>;
};

export enum AuthorizationPrivilege {
  Admin = 'ADMIN',
  AuthorizationReset = 'AUTHORIZATION_RESET',
  CommunityApply = 'COMMUNITY_APPLY',
  CommunityContextReview = 'COMMUNITY_CONTEXT_REVIEW',
  CommunityJoin = 'COMMUNITY_JOIN',
  Create = 'CREATE',
  CreateAspect = 'CREATE_ASPECT',
  CreateCallout = 'CREATE_CALLOUT',
  CreateCanvas = 'CREATE_CANVAS',
  CreateComment = 'CREATE_COMMENT',
  CreateHub = 'CREATE_HUB',
  CreateOrganization = 'CREATE_ORGANIZATION',
  CreateRelation = 'CREATE_RELATION',
  Delete = 'DELETE',
  Grant = 'GRANT',
  GrantGlobalAdmins = 'GRANT_GLOBAL_ADMINS',
  PlatformAdmin = 'PLATFORM_ADMIN',
  Read = 'READ',
  ReadUsers = 'READ_USERS',
  Update = 'UPDATE',
  UpdateCanvas = 'UPDATE_CANVAS',
  UpdateInnovationFlow = 'UPDATE_INNOVATION_FLOW',
}

export type Callout = {
  /** The Aspects associated with this Callout. */
  aspects?: Maybe<Array<Aspect>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Canvases associated with this Callout. */
  canvases?: Maybe<Array<Canvas>>;
  /** The Comments object for this Callout. */
  comments?: Maybe<Comments>;
  /** The description of this Callout */
  description: Scalars['Markdown'];
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The sorting order for this Callout. */
  sortOrder: Scalars['Float'];
  /** State of the Callout. */
  state: CalloutState;
  /** The Callout type, e.g. Card, Canvas, Discussion */
  type: CalloutType;
  /** Visibility of the Callout. */
  visibility: CalloutVisibility;
};

export type CalloutAspectsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type CalloutCanvasesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type CalloutAspectCreated = {
  /** The aspect that has been created. */
  aspect: Aspect;
  /** The identifier for the Callout on which the aspect was created. */
  calloutID: Scalars['String'];
};

export type CalloutMessageReceived = {
  /** The identifier for the Callout. */
  calloutID: Scalars['String'];
  /** The identifier for the Comments. */
  commentsID: Scalars['String'];
  /** The message that has been sent. */
  message: Message;
};

export enum CalloutState {
  Archived = 'ARCHIVED',
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export enum CalloutType {
  Canvas = 'CANVAS',
  Card = 'CARD',
  Comments = 'COMMENTS',
}

export enum CalloutVisibility {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type Canvas = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The checkout out state of this Canvas. */
  checkout?: Maybe<CanvasCheckout>;
  /** The id of the user that created this Canvas */
  createdBy: Scalars['UUID'];
  createdDate: Scalars['DateTime'];
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The preview image for the Canvas. */
  preview?: Maybe<Visual>;
  /** The JSON representation of the Canvas. */
  value: Scalars['JSON'];
};

export type CanvasCheckout = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  /** The id of the user that has checked the entity out. */
  lockedBy: Scalars['UUID'];
  /** The checkout out state of this Canvas. */
  status: CanvasCheckoutStateEnum;
};

export type CanvasCheckoutEventInput = {
  canvasCheckoutID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export enum CanvasCheckoutStateEnum {
  Available = 'AVAILABLE',
  CheckedOut = 'CHECKED_OUT',
}

export type CanvasContentUpdated = {
  /** The identifier for the Canvas. */
  canvasID: Scalars['String'];
  /** The updated content. */
  value: Scalars['String'];
};

export type CanvasTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The meta information for this Template */
  info: TemplateInfo;
  /** The JSON representation of the Canvas. */
  value: Scalars['JSON'];
};

export type Challenge = Searchable & {
  /** The activity within this Challenge. */
  activity?: Maybe<Array<Nvp>>;
  /** The Agent representing this Challenge. */
  agent?: Maybe<Agent>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The set of child Challenges within this challenge. */
  challenges?: Maybe<Array<Challenge>>;
  /** The collaboration for the challenge. */
  collaboration?: Maybe<Collaboration>;
  /** The community for the challenge. */
  community?: Maybe<Community>;
  /** The context for the challenge. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the containing Hub. */
  hubID: Scalars['String'];
  id: Scalars['UUID'];
  /** The lifeycle for the Challenge. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Opportunities for the challenge. */
  opportunities?: Maybe<Array<Opportunity>>;
  /** The preferences for this Challenge */
  preferences: Array<Preference>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type ChallengeOpportunitiesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export enum ChallengePreferenceType {
  MembershipApplyChallengeFromHubMembers = 'MEMBERSHIP_APPLY_CHALLENGE_FROM_HUB_MEMBERS',
  MembershipFeedbackOnChallengeContext = 'MEMBERSHIP_FEEDBACK_ON_CHALLENGE_CONTEXT',
  MembershipJoinChallengeFromHubMembers = 'MEMBERSHIP_JOIN_CHALLENGE_FROM_HUB_MEMBERS',
}

export type ChallengeTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Feedback templates. */
  feedback?: Maybe<Array<FeedbackTemplate>>;
  /** Challenge template name. */
  name: Scalars['String'];
};

export type Collaboration = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** List of callouts */
  callouts?: Maybe<Array<Callout>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** List of relations */
  relations?: Maybe<Array<Relation>>;
};

export type CollaborationCalloutsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type Comments = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Messages in this Comments. */
  messages?: Maybe<Array<Message>>;
};

export type CommentsRemoveMessageInput = {
  /** The Comments the message is being removed from. */
  commentsID: Scalars['UUID'];
  /** The message id that should be removed */
  messageID: Scalars['String'];
};

export type CommentsSendMessageInput = {
  /** The Comments the message is being sent to */
  commentsID: Scalars['UUID'];
  /** The message being sent */
  message: Scalars['String'];
};

export type Communication = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A particular Discussions active in this Communication. */
  discussion?: Maybe<Discussion>;
  /** The Discussions active in this Communication. */
  discussions?: Maybe<Array<Discussion>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Updates for this Communication. */
  updates?: Maybe<Updates>;
};

export type CommunicationDiscussionArgs = {
  ID: Scalars['String'];
};

export type CommunicationAdminEnsureAccessInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** A unique identifier for this comunication room membership result. */
  id: Scalars['String'];
  /** Rooms in this Communication */
  rooms: Array<CommunicationAdminRoomMembershipResult>;
};

export type CommunicationAdminOrphanedUsageResult = {
  /** Rooms in the Communication platform that are not used */
  rooms: Array<CommunicationAdminRoomResult>;
};

export type CommunicationAdminRemoveOrphanedRoomInput = {
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomMembershipResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** Members of the room that are not members of the Community. */
  extraMembers: Array<Scalars['String']>;
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** The access mode for the room. */
  joinRule: Scalars['String'];
  /** Name of the room */
  members: Array<Scalars['String']>;
  /** Members of the community that are missing from the room */
  missingMembers: Array<Scalars['String']>;
  /** The matrix room ID */
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** The identifier for the orphaned room. */
  id: Scalars['String'];
  /** The members of the orphaned room */
  members: Array<Scalars['String']>;
};

export type CommunicationAdminUpdateRoomsJoinRuleInput = {
  isPublic: Scalars['Boolean'];
};

export type CommunicationCreateDiscussionInput = {
  /** The category for the Discussion */
  category: DiscussionCategory;
  /** The identifier for the Communication entity the Discussion is being created on. */
  communicationID: Scalars['UUID'];
  /** The description for the Discussion */
  description?: InputMaybe<Scalars['String']>;
  /** The title for the Discussion */
  title: Scalars['String'];
};

export type CommunicationDiscussionMessageReceived = {
  /** The identifier for the Discussion on which the message was sent. */
  discussionID: Scalars['String'];
  /** The message that has been sent. */
  message: Message;
};

export type CommunicationRoom = {
  /** The display name of the room */
  displayName: Scalars['String'];
  /** The identifier of the room */
  id: Scalars['String'];
  /** The messages that have been sent to the Room. */
  messages: Array<Message>;
};

export type CommunicationUpdateMessageReceived = {
  /** The message that has been sent. */
  message: Message;
  /** The identifier for the Updates on which the message was sent. */
  updatesID: Scalars['String'];
};

export type Community = Groupable & {
  /** Application available for this community. */
  applications?: Maybe<Array<Application>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** All member users excluding the current lead users in this Community. */
  availableLeadUsers?: Maybe<PaginatedUsers>;
  /** All available users that are potential Community members. */
  availableMemberUsers?: Maybe<PaginatedUsers>;
  /** The Communications for this Community. */
  communication?: Maybe<Communication>;
  /** The name of the Community */
  displayName: Scalars['String'];
  /** Groups of users related to a Community. */
  groups?: Maybe<Array<UserGroup>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** All Organizations that are leads in this Community. */
  leadOrganizations?: Maybe<Array<Organization>>;
  /** All users that are leads in this Community. */
  leadUsers?: Maybe<Array<User>>;
  /** All Organizations that are contributing to this Community. */
  memberOrganizations?: Maybe<Array<Organization>>;
  /** All users that are contributing to this Community. */
  memberUsers?: Maybe<Array<User>>;
  /** The policy that defines the roles for this Community. */
  policy?: Maybe<CommunityPolicy>;
};

export type CommunityAvailableLeadUsersArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommunityAvailableMemberUsersArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommunityApplyInput = {
  communityID: Scalars['UUID'];
  questions: Array<CreateNvpInput>;
};

export type CommunityJoinInput = {
  communityID: Scalars['UUID'];
};

export type CommunityPolicy = {
  lead: CommunityPolicyRole;
  member: CommunityPolicyRole;
};

export type CommunityPolicyRole = {
  /** The CredentialDefinition that is associated with this role */
  credential: CredentialDefinition;
  /** Maximum number of Organizations in this role */
  maxOrg: Scalars['Float'];
  /** Maximum number of Users in this role */
  maxUser: Scalars['Float'];
  /** Minimun number of Organizations in this role */
  minOrg: Scalars['Float'];
  /** Minimum number of Users in this role */
  minUser: Scalars['Float'];
};

export type Config = {
  /** Authentication configuration. */
  authentication: AuthenticationConfig;
  /** Platform related resources. */
  platform: Platform;
  /** Sentry (client monitoring) related configuration. */
  sentry: Sentry;
  /** Alkemio template configuration. */
  template: Template;
};

export type Context = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A detailed description of the current situation */
  background?: Maybe<Scalars['String']>;
  /** The EcosystemModel for this Context. */
  ecosystemModel?: Maybe<EcosystemModel>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** What is the potential impact? */
  impact?: Maybe<Scalars['Markdown']>;
  /** Location of this entity */
  location?: Maybe<Location>;
  /** The References for this Context. */
  references?: Maybe<Array<Reference>>;
  /** A one line description */
  tagline?: Maybe<Scalars['String']>;
  /** The goal that is being pursued */
  vision?: Maybe<Scalars['Markdown']>;
  /** The Visual assets for this Context. */
  visuals?: Maybe<Array<Visual>>;
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['String']>;
};

export type ContributorFilterInput = {
  /** Return contributors with credentials in the provided list */
  credentials?: InputMaybe<Array<AuthorizationCredential>>;
};

export type ContributorRoles = {
  /** Open applications for this contributor. */
  applications?: Maybe<Array<ApplicationForRoleResult>>;
  /** Details of Hubs the User or Organization is a member of, with child memberships */
  hubs: Array<RolesResultHub>;
  id: Scalars['UUID'];
  /** Details of the Organizations the User is a member of, with child memberships. */
  organizations: Array<RolesResultOrganization>;
};

export type ConvertChallengeToHubInput = {
  /** The Challenge to be promoted to be a new Hub. Note: the original Challenge will no longer exist after the conversion.  */
  challengeID: Scalars['UUID_NAMEID'];
};

export type ConvertOpportunityToChallengeInput = {
  /** The Opportunity to be promoted to be a new Challenge. Note: the original Opportunity will no longer exist after the conversion.  */
  opportunityID: Scalars['UUID_NAMEID'];
};

export type CreateActorGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  ecosystemModelID: Scalars['UUID'];
  name: Scalars['String'];
};

export type CreateActorInput = {
  actorGroupID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  impact?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type CreateAspectOnCalloutInput = {
  calloutID: Scalars['UUID'];
  description: Scalars['Markdown'];
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};

export type CreateAspectTemplateOnTemplatesSetInput = {
  /** The default description to be pre-filled when users create Aspects based on this template. */
  defaultDescription: Scalars['Markdown'];
  /** The meta information for this Template. */
  info: CreateTemplateInfoInput;
  templatesSetID: Scalars['UUID'];
  /** The type of Aspects created from this Template. */
  type: Scalars['String'];
};

export type CreateCalloutOnCollaborationInput = {
  collaborationID: Scalars['UUID'];
  /** Callout description. */
  description: Scalars['Markdown'];
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** State of the callout. */
  state?: InputMaybe<CalloutState>;
  /** Callout type. */
  type: CalloutType;
};

export type CreateCanvasOnCalloutInput = {
  calloutID: Scalars['UUID'];
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** A readable identifier, unique within the containing scope. If not provided it will be generated based on the displayName. */
  nameID?: InputMaybe<Scalars['NameID']>;
  value?: InputMaybe<Scalars['String']>;
};

export type CreateCanvasTemplateOnTemplatesSetInput = {
  /** Use the specified Canvas as the initial value for this CanvasTempplate */
  canvasID?: InputMaybe<Scalars['UUID']>;
  /** The meta information for this Template. */
  info: CreateTemplateInfoInput;
  templatesSetID: Scalars['UUID'];
  value?: InputMaybe<Scalars['JSON']>;
};

export type CreateChallengeOnChallengeInput = {
  challengeID: Scalars['UUID'];
  context?: InputMaybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** The Innovation Flow template to use for the Challenge. */
  innovationFlowTemplateID: Scalars['UUID'];
  /** Set lead Organizations for the Challenge. */
  leadOrganizations?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateChallengeOnHubInput = {
  context?: InputMaybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  hubID: Scalars['UUID_NAMEID'];
  /** The Innovation Flow template to use for the Challenge. */
  innovationFlowTemplateID: Scalars['UUID'];
  /** Set lead Organizations for the Challenge. */
  leadOrganizations?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateContextInput = {
  background?: InputMaybe<Scalars['Markdown']>;
  impact?: InputMaybe<Scalars['Markdown']>;
  location?: InputMaybe<CreateLocationInput>;
  /** Set of References for the new Context. */
  references?: InputMaybe<Array<CreateReferenceInput>>;
  tagline?: InputMaybe<Scalars['String']>;
  vision?: InputMaybe<Scalars['Markdown']>;
  who?: InputMaybe<Scalars['Markdown']>;
};

export type CreateFeedbackOnCommunityContextInput = {
  communityID: Scalars['UUID'];
  questions: Array<CreateNvpInput>;
};

export type CreateHubInput = {
  context?: InputMaybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** The host Organization for the hub */
  hostID: Scalars['UUID_NAMEID'];
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateLifecycleTemplateOnTemplatesSetInput = {
  /** The XState definition for this LifecycleTemplate. */
  definition: Scalars['LifecycleDefinition'];
  /** The meta information for this Template. */
  info: CreateTemplateInfoInput;
  templatesSetID: Scalars['UUID'];
  /** The type of the Lifecycles that this Template supports. */
  type: LifecycleType;
};

export type CreateLocationInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  sortOrder: Scalars['Float'];
  value: Scalars['String'];
};

export type CreateOpportunityInput = {
  challengeID: Scalars['UUID'];
  context?: InputMaybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** The Innovation Flow template to use for the Opportunity. */
  innovationFlowTemplateID: Scalars['UUID'];
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateOrganizationInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  profileData?: InputMaybe<CreateProfileInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type CreateProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<CreateLocationInput>;
  referencesData?: InputMaybe<Array<CreateReferenceInput>>;
  tagsetsData?: InputMaybe<Array<CreateTagsetInput>>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  opportunityID: Scalars['UUID_NAMEID'];
};

export type CreateReferenceInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateReferenceOnAspectInput = {
  aspectID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateReferenceOnContextInput = {
  contextID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateReferenceOnProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileID: Scalars['UUID'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateRelationOnCollaborationInput = {
  actorName: Scalars['String'];
  actorRole?: InputMaybe<Scalars['String']>;
  actorType?: InputMaybe<Scalars['String']>;
  collaborationID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateTagsetOnProfileInput = {
  name: Scalars['String'];
  profileID?: InputMaybe<Scalars['UUID']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateTemplateInfoInput = {
  description: Scalars['Markdown'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateUserGroupInput = {
  /** The name of the UserGroup. Minimum length 2. */
  name: Scalars['String'];
  parentID: Scalars['UUID'];
  profileData?: InputMaybe<CreateProfileInput>;
};

export type CreateUserInput = {
  accountUpn?: InputMaybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  phone?: InputMaybe<Scalars['String']>;
  profileData?: InputMaybe<CreateProfileInput>;
};

export type Credential = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  resourceID: Scalars['String'];
  type: AuthorizationCredential;
};

export type CredentialDefinition = {
  /** The resourceID for this CredentialDefinition */
  resourceID: Scalars['String'];
  /** The type for this CredentialDefinition */
  type: Scalars['String'];
};

export type CredentialMetadataOutput = {
  /** A json description of what the claim contains and schema validation definition */
  context: Scalars['String'];
  /** The purpose of the credential */
  description: Scalars['String'];
  /** The display name of the credential */
  name: Scalars['String'];
  /** The schema that the credential will be validated against */
  schema: Scalars['String'];
  /** The credential types that are associated with this credential */
  types: Array<Scalars['String']>;
  /** System recognized unique type for the credential */
  uniqueType: Scalars['String'];
};

export type DeleteActorGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteActorInput = {
  ID: Scalars['UUID'];
};

export type DeleteApplicationInput = {
  ID: Scalars['UUID'];
};

export type DeleteAspectInput = {
  ID: Scalars['UUID'];
};

export type DeleteAspectTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalloutInput = {
  ID: Scalars['UUID'];
};

export type DeleteCanvasInput = {
  ID: Scalars['UUID'];
};

export type DeleteCanvasTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteChallengeInput = {
  ID: Scalars['UUID'];
};

export type DeleteCollaborationInput = {
  ID: Scalars['UUID'];
};

export type DeleteDiscussionInput = {
  ID: Scalars['UUID'];
};

export type DeleteHubInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteLifecycleTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteOpportunityInput = {
  ID: Scalars['UUID'];
};

export type DeleteOrganizationInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteProjectInput = {
  ID: Scalars['UUID'];
};

export type DeleteReferenceInput = {
  ID: Scalars['UUID'];
};

export type DeleteRelationInput = {
  ID: Scalars['String'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserInput = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type DirectRoom = {
  /** The display name of the room */
  displayName: Scalars['String'];
  /** The identifier of the direct room */
  id: Scalars['String'];
  /** The messages that have been sent to the Direct Room. */
  messages: Array<Message>;
  /** The recepient userID */
  receiverID?: Maybe<Scalars['String']>;
};

export type Discussion = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The category assigned to this Discussion. */
  category: DiscussionCategory;
  /** The number of comments. */
  commentsCount: Scalars['Float'];
  /** The id of the user that created this discussion */
  createdBy: Scalars['UUID'];
  /** The description of this Discussion. */
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Messages for this Discussion. */
  messages?: Maybe<Array<Message>>;
  /** The timestamp for the creation of this Discussion. */
  timestamp?: Maybe<Scalars['Float']>;
  /** The title of the Discussion. */
  title: Scalars['String'];
};

export enum DiscussionCategory {
  General = 'GENERAL',
  Ideas = 'IDEAS',
  Questions = 'QUESTIONS',
  Sharing = 'SHARING',
}

export type DiscussionRemoveMessageInput = {
  /** The Discussion to remove a message from. */
  discussionID: Scalars['UUID'];
  /** The message id that should be removed */
  messageID: Scalars['MessageID'];
};

export type DiscussionSendMessageInput = {
  /** The Discussion the message is being sent to */
  discussionID: Scalars['UUID'];
  /** The message being sent */
  message: Scalars['String'];
};

export type EcosystemModel = {
  /** A list of ActorGroups */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Overview of this ecosystem model. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type FeatureFlag = {
  /** Whether the feature flag is enabled / disabled. */
  enabled: Scalars['Boolean'];
  /** The name of the feature flag */
  name: Scalars['String'];
};

export type FeedbackTemplate = {
  /** Feedback template name. */
  name: Scalars['String'];
  /** Template questions. */
  questions: Array<QuestionTemplate>;
};

export type GrantAuthorizationCredentialInput = {
  /** The resource to which this credential is tied. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
  /** The user to whom the credential is being granted. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type Groupable = {
  /** The groups contained by this entity. */
  groups?: Maybe<Array<UserGroup>>;
};

export type Hub = Searchable & {
  /** The activity within this Hub. */
  activity?: Maybe<Array<Nvp>>;
  /** The Agent representing this Hub. */
  agent?: Maybe<Agent>;
  /** A particular User Application within this Hub. */
  application: Application;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A particular Challenge, either by its ID or nameID */
  challenge: Challenge;
  /** The challenges for the hub. */
  challenges?: Maybe<Array<Challenge>>;
  /** The collaboration for the Hub. */
  collaboration?: Maybe<Collaboration>;
  /** Get a Community within the Hub. Defaults to the Community for the Hub itself. */
  community?: Maybe<Community>;
  /** The context for the hub. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The user group with the specified id anywhere in the hub */
  group: UserGroup;
  /** The User Groups on this Hub */
  groups: Array<UserGroup>;
  /** All groups on this Hub that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The Hub host. */
  host?: Maybe<Organization>;
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** All opportunities within the hub */
  opportunities?: Maybe<Array<Opportunity>>;
  /** A particular Opportunity, either by its ID or nameID */
  opportunity: Opportunity;
  /** The preferences for this Hub */
  preferences?: Maybe<Array<Preference>>;
  /** A particular Project, identified by the ID */
  project: Project;
  /** All projects within this hub */
  projects: Array<Project>;
  /** The set of tags for the  hub. */
  tagset?: Maybe<Tagset>;
  /** The templates in use by this Hub */
  templates?: Maybe<TemplatesSet>;
  /** Visibility of the Hub. */
  visibility: HubVisibility;
};

export type HubApplicationArgs = {
  ID: Scalars['UUID'];
};

export type HubChallengeArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type HubChallengesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type HubCommunityArgs = {
  ID?: InputMaybe<Scalars['UUID']>;
};

export type HubGroupArgs = {
  ID: Scalars['UUID'];
};

export type HubGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type HubOpportunityArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type HubProjectArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type HubAspectTemplate = {
  /** A default description for this Aspect. */
  defaultDescription: Scalars['String'];
  /** The type of the Aspect */
  type: Scalars['String'];
  /** A description for this Aspect type. */
  typeDescription: Scalars['String'];
};

export type HubAuthorizationResetInput = {
  /** The identifier of the Hub whose Authorization Policy should be reset. */
  hubID: Scalars['UUID_NAMEID'];
};

export type HubFilterInput = {
  /** Return Hubs with a Visibility matching one of the provided types. */
  visibilities?: InputMaybe<Array<HubVisibility>>;
};

export enum HubPreferenceType {
  AuthorizationAnonymousReadAccess = 'AUTHORIZATION_ANONYMOUS_READ_ACCESS',
  MembershipApplicationsFromAnyone = 'MEMBERSHIP_APPLICATIONS_FROM_ANYONE',
  MembershipJoinHubFromAnyone = 'MEMBERSHIP_JOIN_HUB_FROM_ANYONE',
  MembershipJoinHubFromHostOrganizationMembers = 'MEMBERSHIP_JOIN_HUB_FROM_HOST_ORGANIZATION_MEMBERS',
}

export enum HubVisibility {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Demo = 'DEMO',
}

export type Lifecycle = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The machine definition, describing the states, transitions etc for this Lifeycle. */
  machineDef: Scalars['LifecycleDefinition'];
  /** The next events of this Lifecycle. */
  nextEvents?: Maybe<Array<Scalars['String']>>;
  /** The current state of this Lifecycle. */
  state?: Maybe<Scalars['String']>;
  /** Is this lifecycle in a final state (done). */
  stateIsFinal: Scalars['Boolean'];
  /** The Lifecycle template name. */
  templateName?: Maybe<Scalars['String']>;
};

export type LifecycleTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The XState definition for this LifecycleTemplate. */
  definition: Scalars['LifecycleDefinition'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The meta information for this Template */
  info: TemplateInfo;
  /** The type for this LifecycleTemplate. */
  type: LifecycleType;
};

export enum LifecycleType {
  Challenge = 'CHALLENGE',
  Opportunity = 'OPPORTUNITY',
}

export type Location = {
  city: Scalars['String'];
  country: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
};

/** A message that was sent either as an Update or as part of a Discussion. */
export type Message = {
  /** The id for the message event. */
  id: Scalars['MessageID'];
  /** The message being sent */
  message: Scalars['Markdown'];
  /** The sender user ID */
  sender: Scalars['UUID'];
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

export type Metadata = {
  /** Metrics about the activity on the platform */
  activity: Array<Nvp>;
  /** Collection of metadata about Alkemio services. */
  services: Array<ServiceMetadata>;
};

export type Mutation = {
  /** Ensure all community members are registered for communications. */
  adminCommunicationEnsureAccessToCommunications: Scalars['Boolean'];
  /** Remove an orphaned room from messaging platform. */
  adminCommunicationRemoveOrphanedRoom: Scalars['Boolean'];
  /** Allow updating the rule for joining rooms: public or invite. */
  adminCommunicationUpdateRoomsJoinRule: Scalars['Boolean'];
  /** Apply to join the specified Community as a member. */
  applyForCommunityMembership: Application;
  /** Assigns an Organization as a Lead of the specified Community. */
  assignOrganizationAsCommunityLead: Community;
  /** Assigns an Organization as a member of the specified Community. */
  assignOrganizationAsCommunityMember: Community;
  /** Assigns a User as an Challenge Admin. */
  assignUserAsChallengeAdmin: User;
  /** Assigns a User as a lead of the specified Community. */
  assignUserAsCommunityLead: Community;
  /** Assigns a User as a member of the specified Community. */
  assignUserAsCommunityMember: Community;
  /** Assigns a User as a Global Admin. */
  assignUserAsGlobalAdmin: User;
  /** Assigns a User as a Global Community Admin. */
  assignUserAsGlobalCommunityAdmin: User;
  /** Assigns a User as a Global Hubs Admin. */
  assignUserAsGlobalHubsAdmin: User;
  /** Assigns a User as an Hub Admin. */
  assignUserAsHubAdmin: User;
  /** Assigns a User as an Opportunity Admin. */
  assignUserAsOpportunityAdmin: User;
  /** Assigns a User as an Organization Admin. */
  assignUserAsOrganizationAdmin: User;
  /** Assigns a User as an Organization Owner. */
  assignUserAsOrganizationOwner: User;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Assigns a User as a member of the specified Organization. */
  assignUserToOrganization: Organization;
  /** Reset the Authorization Policy on the specified Hub. */
  authorizationPolicyResetOnHub: Hub;
  /** Reset the Authorization Policy on the specified Organization. */
  authorizationPolicyResetOnOrganization: Organization;
  /** Reset the Authorization policy on the specified User. */
  authorizationPolicyResetOnUser: User;
  /** Generate Alkemio user credential offer */
  beginAlkemioUserVerifiedCredentialOfferInteraction: AgentBeginVerifiedCredentialOfferOutput;
  /** Generate community member credential offer */
  beginCommunityMemberVerifiedCredentialOfferInteraction: AgentBeginVerifiedCredentialOfferOutput;
  /** Generate verified credential share request */
  beginVerifiedCredentialRequestInteraction: AgentBeginVerifiedCredentialRequestOutput;
  /** Creates a new Hub by converting an existing Challenge. */
  convertChallengeToHub: Hub;
  /** Creates a new Challenge by converting an existing Opportunity. */
  convertOpportunityToChallenge: Challenge;
  /** Creates a new Actor in the specified ActorGroup. */
  createActor: Actor;
  /** Create a new Actor Group on the EcosystemModel. */
  createActorGroup: ActorGroup;
  /** Create a new Aspect on the Callout. */
  createAspectOnCallout: Aspect;
  /** Creates a new AspectTemplate on the specified TemplatesSet. */
  createAspectTemplate: AspectTemplate;
  /** Create a new Callout on the Collaboration. */
  createCalloutOnCollaboration: Callout;
  /** Create a new Canvas on the Callout. */
  createCanvasOnCallout: Canvas;
  /** Creates a new CanvasTemplate on the specified TemplatesSet. */
  createCanvasTemplate: CanvasTemplate;
  /** Creates a new Challenge within the specified Hub. */
  createChallenge: Challenge;
  /** Creates a new child challenge within the parent Challenge. */
  createChildChallenge: Challenge;
  /** Creates a new Discussion as part of this Communication. */
  createDiscussion: Discussion;
  /** Creates feedback on community context from users having COMMUNITY_CONTEXT_REVIEW privilege */
  createFeedbackOnCommunityContext: Scalars['Boolean'];
  /** Creates a new User Group in the specified Community. */
  createGroupOnCommunity: UserGroup;
  /** Creates a new User Group for the specified Organization. */
  createGroupOnOrganization: UserGroup;
  /** Creates a new Hub. */
  createHub: Hub;
  /** Creates a new LifecycleTemplate on the specified TemplatesSet. */
  createLifecycleTemplate: LifecycleTemplate;
  /** Creates a new Opportunity within the parent Challenge. */
  createOpportunity: Opportunity;
  /** Creates a new Organization on the platform. */
  createOrganization: Organization;
  /** Create a new Project on the Opportunity */
  createProject: Project;
  /** Creates a new Reference on the specified Aspect. */
  createReferenceOnAspect: Reference;
  /** Creates a new Reference on the specified Context. */
  createReferenceOnContext: Reference;
  /** Creates a new Reference on the specified Profile. */
  createReferenceOnProfile: Reference;
  /** Create a new Relation on the Collaboration. */
  createRelationOnCollaboration: Relation;
  /** Creates a new Tagset on the specified Profile */
  createTagsetOnProfile: Tagset;
  /** Creates a new User on the platform. */
  createUser: User;
  /** Creates a new User profile on the platform for a user that has a valid Authentication session. */
  createUserNewRegistration: User;
  /** Deletes the specified Actor. */
  deleteActor: Actor;
  /** Deletes the specified Actor Group, including contained Actors. */
  deleteActorGroup: ActorGroup;
  /** Deletes the specified Aspect. */
  deleteAspect: Aspect;
  /** Deletes the specified AspectTemplate. */
  deleteAspectTemplate: AspectTemplate;
  /** Delete a Callout. */
  deleteCallout: Callout;
  /** Updates the specified Canvas. */
  deleteCanvas: Canvas;
  /** Deletes the specified CanvasTemplate. */
  deleteCanvasTemplate: CanvasTemplate;
  /** Deletes the specified Challenge. */
  deleteChallenge: Challenge;
  /** Delete Collaboration. */
  deleteCollaboration: Collaboration;
  /** Deletes the specified Discussion. */
  deleteDiscussion: Discussion;
  /** Deletes the specified Hub. */
  deleteHub: Hub;
  /** Deletes the specified LifecycleTemplate. */
  deleteLifecycleTemplate: LifecycleTemplate;
  /** Deletes the specified Opportunity. */
  deleteOpportunity: Opportunity;
  /** Deletes the specified Organization. */
  deleteOrganization: Organization;
  /** Deletes the specified Project. */
  deleteProject: Project;
  /** Deletes the specified Reference. */
  deleteReference: Reference;
  /** Deletes the specified Relation. */
  deleteRelation: Relation;
  /** Deletes the specified User. */
  deleteUser: User;
  /** Removes the specified User Application. */
  deleteUserApplication: Application;
  /** Deletes the specified User Group. */
  deleteUserGroup: UserGroup;
  /** Trigger an event on the Application. */
  eventOnApplication: Application;
  /** Trigger an event on the Organization Verification. */
  eventOnCanvasCheckout: CanvasCheckout;
  /** Trigger an event on the Challenge. */
  eventOnChallenge: Challenge;
  /** Trigger an event on the Opportunity. */
  eventOnOpportunity: Opportunity;
  /** Trigger an event on the Organization Verification. */
  eventOnOrganizationVerification: OrganizationVerification;
  /** Trigger an event on the Project. */
  eventOnProject: Project;
  /** Grants an authorization credential to a User. */
  grantCredentialToUser: User;
  /** Join the specified Community as a member, without going through an approval process. */
  joinCommunity: Community;
  /** Sends a message on the specified User`s behalf and returns the room id */
  messageUser: Scalars['String'];
  /** Removes a comment message. */
  removeComment: Scalars['MessageID'];
  /** Removes a message from the specified Discussion. */
  removeMessageFromDiscussion: Scalars['MessageID'];
  /** Removes an Organization as a Lead of the specified Community. */
  removeOrganizationAsCommunityLead: Community;
  /** Removes an Organization as a member of the specified Community. */
  removeOrganizationAsCommunityMember: Community;
  /** Removes an update message. */
  removeUpdate: Scalars['MessageID'];
  /** Removes a User from being an Challenge Admin. */
  removeUserAsChallengeAdmin: User;
  /** Removes a User as a member of the specified Community. */
  removeUserAsCommunityLead: Community;
  /** Removes a User as a member of the specified Community. */
  removeUserAsCommunityMember: Community;
  /** Removes a User from being a Global Admin. */
  removeUserAsGlobalAdmin: User;
  /** Removes a User from being a Global Community Admin. */
  removeUserAsGlobalCommunityAdmin: User;
  /** Removes a User from being a Global Hubs Admin. */
  removeUserAsGlobalHubsAdmin: User;
  /** Removes a User from being an Hub Admin. */
  removeUserAsHubAdmin: User;
  /** Removes a User from being an Opportunity Admin. */
  removeUserAsOpportunityAdmin: User;
  /** Removes a User from being an Organization Admin. */
  removeUserAsOrganizationAdmin: User;
  /** Removes a User from being an Organization Owner. */
  removeUserAsOrganizationOwner: User;
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Removes a User as a member of the specified Organization. */
  removeUserFromOrganization: Organization;
  /** Removes an authorization credential from a User. */
  revokeCredentialFromUser: User;
  /** Sends an comment message. Returns the id of the new Update message. */
  sendComment: Message;
  /** Send a message on a Comments Callout */
  sendMessageOnCallout: Message;
  /** Sends a message to the specified Discussion.  */
  sendMessageToDiscussion: Message;
  /** Sends an update message. Returns the id of the new Update message. */
  sendUpdate: Message;
  /** Updates the specified Actor. */
  updateActor: Actor;
  /** Updates the specified Aspect. */
  updateAspect: Aspect;
  /** Updates the specified AspectTemplate. */
  updateAspectTemplate: AspectTemplate;
  /** Update a Callout. */
  updateCallout: Callout;
  /** Update the visibility of the specified Callout. */
  updateCalloutVisibility: Callout;
  /** Updates the specified Canvas. */
  updateCanvas: Canvas;
  /** Updates the specified CanvasTemplate. */
  updateCanvasTemplate: CanvasTemplate;
  /** Updates the specified Challenge. */
  updateChallenge: Challenge;
  /** Updates the Innovation Flow on the specified Challenge. */
  updateChallengeInnovationFlow: Challenge;
  /** Updates the specified Discussion. */
  updateDiscussion: Discussion;
  /** Updates the specified EcosystemModel. */
  updateEcosystemModel: EcosystemModel;
  /** Updates the Hub. */
  updateHub: Hub;
  /** Update the visibility of the specified Hub. */
  updateHubVisibility: Hub;
  /** Updates the specified LifecycleTemplate. */
  updateLifecycleTemplate: LifecycleTemplate;
  /** Updates the specified Opportunity. */
  updateOpportunity: Opportunity;
  /** Updates the Innovation Flow on the specified Opportunity. */
  updateOpportunityInnovationFlow: Opportunity;
  /** Updates the specified Organization. */
  updateOrganization: Organization;
  /** Updates one of the Preferences on a Challenge */
  updatePreferenceOnChallenge: Preference;
  /** Updates one of the Preferences on a Hub */
  updatePreferenceOnHub: Preference;
  /** Updates one of the Preferences on an Organization */
  updatePreferenceOnOrganization: Preference;
  /** Updates one of the Preferences on a Hub */
  updatePreferenceOnUser: Preference;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Project. */
  updateProject: Project;
  /** Updates the User. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Updates the image URI for the specified Visual. */
  updateVisual: Visual;
  /** Uploads and sets an image for the specified Visual. */
  uploadImageOnVisual: Visual;
};

export type MutationAdminCommunicationEnsureAccessToCommunicationsArgs = {
  communicationData: CommunicationAdminEnsureAccessInput;
};

export type MutationAdminCommunicationRemoveOrphanedRoomArgs = {
  orphanedRoomData: CommunicationAdminRemoveOrphanedRoomInput;
};

export type MutationAdminCommunicationUpdateRoomsJoinRuleArgs = {
  changeRoomAccessData: CommunicationAdminUpdateRoomsJoinRuleInput;
};

export type MutationApplyForCommunityMembershipArgs = {
  applicationData: CommunityApplyInput;
};

export type MutationAssignOrganizationAsCommunityLeadArgs = {
  leadershipData: AssignCommunityLeadOrganizationInput;
};

export type MutationAssignOrganizationAsCommunityMemberArgs = {
  membershipData: AssignCommunityMemberOrganizationInput;
};

export type MutationAssignUserAsChallengeAdminArgs = {
  membershipData: AssignChallengeAdminInput;
};

export type MutationAssignUserAsCommunityLeadArgs = {
  leadershipData: AssignCommunityLeadUserInput;
};

export type MutationAssignUserAsCommunityMemberArgs = {
  membershipData: AssignCommunityMemberUserInput;
};

export type MutationAssignUserAsGlobalAdminArgs = {
  membershipData: AssignGlobalAdminInput;
};

export type MutationAssignUserAsGlobalCommunityAdminArgs = {
  membershipData: AssignGlobalCommunityAdminInput;
};

export type MutationAssignUserAsGlobalHubsAdminArgs = {
  membershipData: AssignGlobalHubsAdminInput;
};

export type MutationAssignUserAsHubAdminArgs = {
  membershipData: AssignHubAdminInput;
};

export type MutationAssignUserAsOpportunityAdminArgs = {
  membershipData: AssignOpportunityAdminInput;
};

export type MutationAssignUserAsOrganizationAdminArgs = {
  membershipData: AssignOrganizationAdminInput;
};

export type MutationAssignUserAsOrganizationOwnerArgs = {
  membershipData: AssignOrganizationOwnerInput;
};

export type MutationAssignUserToGroupArgs = {
  membershipData: AssignUserGroupMemberInput;
};

export type MutationAssignUserToOrganizationArgs = {
  membershipData: AssignOrganizationMemberInput;
};

export type MutationAuthorizationPolicyResetOnHubArgs = {
  authorizationResetData: HubAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnOrganizationArgs = {
  authorizationResetData: OrganizationAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnUserArgs = {
  authorizationResetData: UserAuthorizationResetInput;
};

export type MutationBeginCommunityMemberVerifiedCredentialOfferInteractionArgs =
  {
    communityID: Scalars['String'];
  };

export type MutationBeginVerifiedCredentialRequestInteractionArgs = {
  types: Array<Scalars['String']>;
};

export type MutationConvertChallengeToHubArgs = {
  convertData: ConvertChallengeToHubInput;
};

export type MutationConvertOpportunityToChallengeArgs = {
  convertData: ConvertOpportunityToChallengeInput;
};

export type MutationCreateActorArgs = {
  actorData: CreateActorInput;
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: CreateActorGroupInput;
};

export type MutationCreateAspectOnCalloutArgs = {
  aspectData: CreateAspectOnCalloutInput;
};

export type MutationCreateAspectTemplateArgs = {
  aspectTemplateInput: CreateAspectTemplateOnTemplatesSetInput;
};

export type MutationCreateCalloutOnCollaborationArgs = {
  calloutData: CreateCalloutOnCollaborationInput;
};

export type MutationCreateCanvasOnCalloutArgs = {
  canvasData: CreateCanvasOnCalloutInput;
};

export type MutationCreateCanvasTemplateArgs = {
  canvasTemplateInput: CreateCanvasTemplateOnTemplatesSetInput;
};

export type MutationCreateChallengeArgs = {
  challengeData: CreateChallengeOnHubInput;
};

export type MutationCreateChildChallengeArgs = {
  challengeData: CreateChallengeOnChallengeInput;
};

export type MutationCreateDiscussionArgs = {
  createData: CommunicationCreateDiscussionInput;
};

export type MutationCreateFeedbackOnCommunityContextArgs = {
  feedbackData: CreateFeedbackOnCommunityContextInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganizationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateHubArgs = {
  hubData: CreateHubInput;
};

export type MutationCreateLifecycleTemplateArgs = {
  lifecycleTemplateInput: CreateLifecycleTemplateOnTemplatesSetInput;
};

export type MutationCreateOpportunityArgs = {
  opportunityData: CreateOpportunityInput;
};

export type MutationCreateOrganizationArgs = {
  organizationData: CreateOrganizationInput;
};

export type MutationCreateProjectArgs = {
  projectData: CreateProjectInput;
};

export type MutationCreateReferenceOnAspectArgs = {
  referenceData: CreateReferenceOnAspectInput;
};

export type MutationCreateReferenceOnContextArgs = {
  referenceInput: CreateReferenceOnContextInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceOnProfileInput;
};

export type MutationCreateRelationOnCollaborationArgs = {
  relationData: CreateRelationOnCollaborationInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetOnProfileInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationDeleteActorArgs = {
  deleteData: DeleteActorInput;
};

export type MutationDeleteActorGroupArgs = {
  deleteData: DeleteActorGroupInput;
};

export type MutationDeleteAspectArgs = {
  deleteData: DeleteAspectInput;
};

export type MutationDeleteAspectTemplateArgs = {
  deleteData: DeleteAspectTemplateInput;
};

export type MutationDeleteCalloutArgs = {
  deleteData: DeleteCalloutInput;
};

export type MutationDeleteCanvasArgs = {
  canvasData: DeleteCanvasInput;
};

export type MutationDeleteCanvasTemplateArgs = {
  deleteData: DeleteCanvasTemplateInput;
};

export type MutationDeleteChallengeArgs = {
  deleteData: DeleteChallengeInput;
};

export type MutationDeleteCollaborationArgs = {
  deleteData: DeleteCollaborationInput;
};

export type MutationDeleteDiscussionArgs = {
  deleteData: DeleteDiscussionInput;
};

export type MutationDeleteHubArgs = {
  deleteData: DeleteHubInput;
};

export type MutationDeleteLifecycleTemplateArgs = {
  deleteData: DeleteLifecycleTemplateInput;
};

export type MutationDeleteOpportunityArgs = {
  deleteData: DeleteOpportunityInput;
};

export type MutationDeleteOrganizationArgs = {
  deleteData: DeleteOrganizationInput;
};

export type MutationDeleteProjectArgs = {
  deleteData: DeleteProjectInput;
};

export type MutationDeleteReferenceArgs = {
  deleteData: DeleteReferenceInput;
};

export type MutationDeleteRelationArgs = {
  deleteData: DeleteRelationInput;
};

export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};

export type MutationDeleteUserApplicationArgs = {
  deleteData: DeleteApplicationInput;
};

export type MutationDeleteUserGroupArgs = {
  deleteData: DeleteUserGroupInput;
};

export type MutationEventOnApplicationArgs = {
  applicationEventData: ApplicationEventInput;
};

export type MutationEventOnCanvasCheckoutArgs = {
  canvasCheckoutEventData: CanvasCheckoutEventInput;
};

export type MutationEventOnChallengeArgs = {
  challengeEventData: ChallengeEventInput;
};

export type MutationEventOnOpportunityArgs = {
  opportunityEventData: OpportunityEventInput;
};

export type MutationEventOnOrganizationVerificationArgs = {
  organizationVerificationEventData: OrganizationVerificationEventInput;
};

export type MutationEventOnProjectArgs = {
  projectEventData: ProjectEventInput;
};

export type MutationGrantCredentialToUserArgs = {
  grantCredentialData: GrantAuthorizationCredentialInput;
};

export type MutationJoinCommunityArgs = {
  joinCommunityData: CommunityJoinInput;
};

export type MutationMessageUserArgs = {
  messageData: UserSendMessageInput;
};

export type MutationRemoveCommentArgs = {
  messageData: CommentsRemoveMessageInput;
};

export type MutationRemoveMessageFromDiscussionArgs = {
  messageData: DiscussionRemoveMessageInput;
};

export type MutationRemoveOrganizationAsCommunityLeadArgs = {
  leadershipData: RemoveCommunityLeadOrganizationInput;
};

export type MutationRemoveOrganizationAsCommunityMemberArgs = {
  membershipData: RemoveCommunityMemberOrganizationInput;
};

export type MutationRemoveUpdateArgs = {
  messageData: UpdatesRemoveMessageInput;
};

export type MutationRemoveUserAsChallengeAdminArgs = {
  membershipData: RemoveChallengeAdminInput;
};

export type MutationRemoveUserAsCommunityLeadArgs = {
  leadershipData: RemoveCommunityLeadUserInput;
};

export type MutationRemoveUserAsCommunityMemberArgs = {
  membershipData: RemoveCommunityMemberUserInput;
};

export type MutationRemoveUserAsGlobalAdminArgs = {
  membershipData: RemoveGlobalAdminInput;
};

export type MutationRemoveUserAsGlobalCommunityAdminArgs = {
  membershipData: RemoveGlobalCommunityAdminInput;
};

export type MutationRemoveUserAsGlobalHubsAdminArgs = {
  membershipData: RemoveGlobalHubsAdminInput;
};

export type MutationRemoveUserAsHubAdminArgs = {
  membershipData: RemoveHubAdminInput;
};

export type MutationRemoveUserAsOpportunityAdminArgs = {
  membershipData: RemoveOpportunityAdminInput;
};

export type MutationRemoveUserAsOrganizationAdminArgs = {
  membershipData: RemoveOrganizationAdminInput;
};

export type MutationRemoveUserAsOrganizationOwnerArgs = {
  membershipData: RemoveOrganizationOwnerInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
};

export type MutationRemoveUserFromOrganizationArgs = {
  membershipData: RemoveOrganizationMemberInput;
};

export type MutationRevokeCredentialFromUserArgs = {
  revokeCredentialData: RevokeAuthorizationCredentialInput;
};

export type MutationSendCommentArgs = {
  messageData: CommentsSendMessageInput;
};

export type MutationSendMessageOnCalloutArgs = {
  data: SendMessageOnCalloutInput;
};

export type MutationSendMessageToDiscussionArgs = {
  messageData: DiscussionSendMessageInput;
};

export type MutationSendUpdateArgs = {
  messageData: UpdatesSendMessageInput;
};

export type MutationUpdateActorArgs = {
  actorData: UpdateActorInput;
};

export type MutationUpdateAspectArgs = {
  aspectData: UpdateAspectInput;
};

export type MutationUpdateAspectTemplateArgs = {
  aspectTemplateInput: UpdateAspectTemplateInput;
};

export type MutationUpdateCalloutArgs = {
  calloutData: UpdateCalloutInput;
};

export type MutationUpdateCalloutVisibilityArgs = {
  calloutData: UpdateCalloutVisibilityInput;
};

export type MutationUpdateCanvasArgs = {
  canvasData: UpdateCanvasDirectInput;
};

export type MutationUpdateCanvasTemplateArgs = {
  canvasTemplateInput: UpdateCanvasTemplateInput;
};

export type MutationUpdateChallengeArgs = {
  challengeData: UpdateChallengeInput;
};

export type MutationUpdateChallengeInnovationFlowArgs = {
  challengeData: UpdateChallengeInnovationFlowInput;
};

export type MutationUpdateDiscussionArgs = {
  updateData: UpdateDiscussionInput;
};

export type MutationUpdateEcosystemModelArgs = {
  ecosystemModelData: UpdateEcosystemModelInput;
};

export type MutationUpdateHubArgs = {
  hubData: UpdateHubInput;
};

export type MutationUpdateHubVisibilityArgs = {
  visibilityData: UpdateHubVisibilityInput;
};

export type MutationUpdateLifecycleTemplateArgs = {
  lifecycleTemplateInput: UpdateLifecycleTemplateInput;
};

export type MutationUpdateOpportunityArgs = {
  opportunityData: UpdateOpportunityInput;
};

export type MutationUpdateOpportunityInnovationFlowArgs = {
  opportunityData: UpdateOpportunityInnovationFlowInput;
};

export type MutationUpdateOrganizationArgs = {
  organizationData: UpdateOrganizationInput;
};

export type MutationUpdatePreferenceOnChallengeArgs = {
  preferenceData: UpdateChallengePreferenceInput;
};

export type MutationUpdatePreferenceOnHubArgs = {
  preferenceData: UpdateHubPreferenceInput;
};

export type MutationUpdatePreferenceOnOrganizationArgs = {
  preferenceData: UpdateOrganizationPreferenceInput;
};

export type MutationUpdatePreferenceOnUserArgs = {
  preferenceData: UpdateUserPreferenceInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileInput;
};

export type MutationUpdateProjectArgs = {
  projectData: UpdateProjectInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUpdateVisualArgs = {
  updateData: UpdateVisualInput;
};

export type MutationUploadImageOnVisualArgs = {
  file: Scalars['Upload'];
  uploadData: VisualUploadImageInput;
};

export type Nvp = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Opportunity = Searchable & {
  /** The activity within this Opportunity. */
  activity?: Maybe<Array<Nvp>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The parent Challenge of the Opportunity */
  challenge?: Maybe<Challenge>;
  /** The collaboration for the Opportunity. */
  collaboration?: Maybe<Collaboration>;
  /** The community for the Opportunity. */
  community?: Maybe<Community>;
  /** The context for the Opportunity. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  id: Scalars['UUID'];
  /** The lifeycle for the Opportunity. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The parent entity (challenge) ID. */
  parentId?: Maybe<Scalars['String']>;
  /** The parent entity name (challenge) ID. */
  parentNameID?: Maybe<Scalars['String']>;
  /** The set of projects within the context of this Opportunity */
  projects?: Maybe<Array<Project>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type OpportunityEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type OpportunityTemplate = {
  /** Template actor groups. */
  actorGroups?: Maybe<Array<Scalars['String']>>;
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Template opportunity name. */
  name: Scalars['String'];
  /** Template relations. */
  relations?: Maybe<Array<Scalars['String']>>;
};

export type Organization = Groupable &
  Searchable & {
    /** The activity within this Organization. */
    activity?: Maybe<Array<Nvp>>;
    /** The Agent representing this User. */
    agent?: Maybe<Agent>;
    /** The Authorization for this Organization. */
    authorization?: Maybe<Authorization>;
    /** Organization contact email */
    contactEmail?: Maybe<Scalars['String']>;
    /** The display name. */
    displayName: Scalars['String'];
    /** Domain name; what is verified, eg. alkem.io */
    domain?: Maybe<Scalars['String']>;
    /** Group defined on this organization. */
    group?: Maybe<UserGroup>;
    /** Groups defined on this organization. */
    groups?: Maybe<Array<UserGroup>>;
    id: Scalars['UUID'];
    /** Legal name - required if hosting an Hub */
    legalEntityName?: Maybe<Scalars['String']>;
    /** All users that are members of this Organization. */
    members?: Maybe<Array<User>>;
    /** A name identifier of the entity, unique within a given scope. */
    nameID: Scalars['NameID'];
    /** The preferences for this Organization */
    preferences: Array<Preference>;
    /** The profile for this organization. */
    profile: Profile;
    verification: OrganizationVerification;
    /** Organization website */
    website?: Maybe<Scalars['String']>;
  };

export type OrganizationGroupArgs = {
  ID: Scalars['UUID'];
};

export type OrganizationAuthorizationResetInput = {
  /** The identifier of the Organization whose Authorization Policy should be reset. */
  organizationID: Scalars['UUID_NAMEID_EMAIL'];
};

export type OrganizationFilterInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  nameID?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export enum OrganizationPreferenceType {
  AuthorizationOrganizationMatchDomain = 'AUTHORIZATION_ORGANIZATION_MATCH_DOMAIN',
}

export type OrganizationTemplate = {
  /** Organization template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};

export type OrganizationVerification = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  /** Organization verification type */
  status: OrganizationVerificationEnum;
};

export enum OrganizationVerificationEnum {
  NotVerified = 'NOT_VERIFIED',
  VerifiedManualAttestation = 'VERIFIED_MANUAL_ATTESTATION',
}

export type OrganizationVerificationEventInput = {
  eventName: Scalars['String'];
  organizationVerificationID: Scalars['UUID'];
};

export type OryConfig = {
  /** Ory Issuer. */
  issuer: Scalars['String'];
  /** Ory Kratos Public Base URL. Used by all Kratos Public Clients. */
  kratosPublicBaseURL: Scalars['String'];
};

export type PageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type PaginatedOrganization = {
  organization: Array<Organization>;
  pageInfo: PageInfo;
};

export type PaginatedUsers = {
  pageInfo: PageInfo;
  users: Array<User>;
};

export type Platform = {
  /** URL to a page about the platform */
  about: Scalars['String'];
  /** The feature flags for the platform */
  featureFlags: Array<FeatureFlag>;
  /** URL to a form for providing feedback */
  feedback: Scalars['String'];
  /** URL for the link Foundation in the HomePage of the application */
  foundation: Scalars['String'];
  /** URL for the link Impact in the HomePage of the application */
  impact: Scalars['String'];
  /** URL for the link Opensource in the HomePage of the application */
  opensource: Scalars['String'];
  /** URL to the privacy policy for the platform */
  privacy: Scalars['String'];
  /** URL where users can get information about previouse releases */
  releases: Scalars['String'];
  /** URL to the security policy for the platform */
  security: Scalars['String'];
  /** URL where users can get support for the platform */
  support: Scalars['String'];
  /** URL to the terms of usage for the platform */
  terms: Scalars['String'];
};

export type PlatformHubTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Hub aspect templates. */
  aspects?: Maybe<Array<HubAspectTemplate>>;
  /** Hub template name. */
  name: Scalars['String'];
};

export type Preference = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The definition for the Preference */
  definition: PreferenceDefinition;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Value of the preference */
  value: Scalars['String'];
};

export type PreferenceDefinition = {
  /** Preference description */
  description: Scalars['String'];
  /** The name */
  displayName: Scalars['String'];
  /** The group for the preference within the containing entity type. */
  group: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The type of the Preference, specific to the Entity it is on. */
  type: PreferenceType;
  /** Preference value type */
  valueType: PreferenceValueType;
};

export enum PreferenceType {
  AuthorizationAnonymousReadAccess = 'AUTHORIZATION_ANONYMOUS_READ_ACCESS',
  AuthorizationOrganizationMatchDomain = 'AUTHORIZATION_ORGANIZATION_MATCH_DOMAIN',
  MembershipApplicationsFromAnyone = 'MEMBERSHIP_APPLICATIONS_FROM_ANYONE',
  MembershipApplyChallengeFromHubMembers = 'MEMBERSHIP_APPLY_CHALLENGE_FROM_HUB_MEMBERS',
  MembershipFeedbackOnChallengeContext = 'MEMBERSHIP_FEEDBACK_ON_CHALLENGE_CONTEXT',
  MembershipJoinChallengeFromHubMembers = 'MEMBERSHIP_JOIN_CHALLENGE_FROM_HUB_MEMBERS',
  MembershipJoinHubFromAnyone = 'MEMBERSHIP_JOIN_HUB_FROM_ANYONE',
  MembershipJoinHubFromHostOrganizationMembers = 'MEMBERSHIP_JOIN_HUB_FROM_HOST_ORGANIZATION_MEMBERS',
  NotificationApplicationReceived = 'NOTIFICATION_APPLICATION_RECEIVED',
  NotificationApplicationSubmitted = 'NOTIFICATION_APPLICATION_SUBMITTED',
  NotificationAspectCommentCreated = 'NOTIFICATION_ASPECT_COMMENT_CREATED',
  NotificationAspectCreated = 'NOTIFICATION_ASPECT_CREATED',
  NotificationAspectCreatedAdmin = 'NOTIFICATION_ASPECT_CREATED_ADMIN',
  NotificationCalloutPublished = 'NOTIFICATION_CALLOUT_PUBLISHED',
  NotificationCommunicationDiscussionCreated = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED',
  NotificationCommunicationDiscussionCreatedAdmin = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED_ADMIN',
  NotificationCommunicationDiscussionResponse = 'NOTIFICATION_COMMUNICATION_DISCUSSION_RESPONSE',
  NotificationCommunicationUpdates = 'NOTIFICATION_COMMUNICATION_UPDATES',
  NotificationCommunicationUpdateSentAdmin = 'NOTIFICATION_COMMUNICATION_UPDATE_SENT_ADMIN',
  NotificationCommunityCollaborationInterestAdmin = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_ADMIN',
  NotificationCommunityCollaborationInterestUser = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_USER',
  NotificationCommunityNewMember = 'NOTIFICATION_COMMUNITY_NEW_MEMBER',
  NotificationCommunityNewMemberAdmin = 'NOTIFICATION_COMMUNITY_NEW_MEMBER_ADMIN',
  NotificationCommunityReviewSubmitted = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED',
  NotificationCommunityReviewSubmittedAdmin = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED_ADMIN',
  NotificationUserSignUp = 'NOTIFICATION_USER_SIGN_UP',
}

export enum PreferenceValueType {
  Boolean = 'BOOLEAN',
  Float = 'FLOAT',
  Int = 'INT',
  String = 'STRING',
}

export type Profile = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Visual avatar for this Profile. */
  avatar?: Maybe<Visual>;
  /** A short description of the entity associated with this profile. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The location for this Profile. */
  location?: Maybe<Location>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
};

export type ProfileCredentialVerified = {
  /** The email */
  userEmail: Scalars['String'];
  /** The vc. */
  vc: Scalars['String'];
};

export type Project = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description?: Maybe<Scalars['String']>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The set of tags for the project */
  tagset?: Maybe<Tagset>;
};

export type ProjectEventInput = {
  /** The ID of the entity to which the event is sent */
  ID: Scalars['String'];
  /** The name of the event. Simple text and matching an event in the Lifecycle definition. */
  eventName: Scalars['String'];
};

export type Query = {
  /** Retrieve the ActivityLog for the specified Collaboration */
  activityLogOnCollaboration: Array<Activity>;
  /** All Users that are members of a given room */
  adminCommunicationMembership: CommunicationAdminMembershipResult;
  /** Usage of the messaging platform that are not tied to the domain model. */
  adminCommunicationOrphanedUsage: CommunicationAdminOrphanedUsageResult;
  /** The authorization policy for the platform */
  authorization: Authorization;
  /** Alkemio configuration. Provides configuration to external services in the Alkemio ecosystem. */
  configuration: Config;
  /** Get supported credential metadata */
  getSupportedVerifiedCredentialMetadata: Array<CredentialMetadataOutput>;
  /** An hub. If no ID is specified then the first Hub is returned. */
  hub: Hub;
  /** The Hubs on this platform */
  hubs: Array<Hub>;
  /** The currently logged in user */
  me: User;
  /** Check if the currently logged in user has a User profile */
  meHasProfile: Scalars['Boolean'];
  /** Alkemio Services Metadata */
  metadata: Metadata;
  /** A particular Organization */
  organization: Organization;
  /** The Organizations on this platform */
  organizations: Array<Organization>;
  /** The Organizations on this platform in paginated format */
  organizationsPaginated: PaginatedOrganization;
  /** The roles that the specified Organization has. */
  rolesOrganization: ContributorRoles;
  /** The roles that that the specified User has. */
  rolesUser: ContributorRoles;
  /** Search the hub for terms supplied */
  search: Array<SearchResultEntry>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** Privileges assigned to a User (based on held credentials) given an Authorization defnition. */
  userAuthorizationPrivileges: Array<AuthorizationPrivilege>;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users filtered by list of IDs. */
  usersById: Array<User>;
  /** The users who have profiles on this platform */
  usersPaginated: PaginatedUsers;
  /** All Users that hold credentials matching the supplied criteria. */
  usersWithAuthorizationCredential: Array<User>;
};

export type QueryActivityLogOnCollaborationArgs = {
  queryData: ActivityLogInput;
};

export type QueryAdminCommunicationMembershipArgs = {
  communicationData: CommunicationAdminMembershipInput;
};

export type QueryHubArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryHubsArgs = {
  filter?: InputMaybe<HubFilterInput>;
};

export type QueryOrganizationArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryOrganizationsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOrganizationsPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<OrganizationFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryRolesOrganizationArgs = {
  rolesData: RolesOrganizationInput;
};

export type QueryRolesUserArgs = {
  rolesData: RolesUserInput;
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QueryUserArgs = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type QueryUserAuthorizationPrivilegesArgs = {
  userAuthorizationPrivilegesData: UserAuthorizationPrivilegesInput;
};

export type QueryUsersArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['UUID']>;
};

export type QueryUsersPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUsersWithAuthorizationCredentialArgs = {
  credentialsCriteriaData: UsersWithAuthorizationCredentialInput;
};

export type Question = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type QuestionTemplate = {
  /** Question template. */
  question: Scalars['String'];
  /** Is question required? */
  required: Scalars['Boolean'];
  /** Sorting order for the question. Lower is first. */
  sortOrder?: Maybe<Scalars['Float']>;
};

export type Reference = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type Relation = {
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  type: Scalars['String'];
};

export type RelayPaginatedUser = Searchable & {
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  /** The Agent representing this User. */
  agent?: Maybe<Agent>;
  /** The Authorization for this User. */
  authorization?: Maybe<Authorization>;
  /** The Community rooms this user is a member of */
  communityRooms?: Maybe<Array<CommunicationRoom>>;
  /** The direct rooms this user is a member of */
  directRooms?: Maybe<Array<DirectRoom>>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The email address for this User. */
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The phone number for this User. */
  phone: Scalars['String'];
  /** The preferences for this user */
  preferences: Array<Preference>;
  /** The Profile for this User. */
  profile?: Maybe<Profile>;
};

export type RelayPaginatedUserEdge = {
  node: RelayPaginatedUser;
};

export type RelayPaginatedUserPageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type RemoveChallengeAdminInput = {
  challengeID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveCommunityLeadOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
};

export type RemoveCommunityLeadUserInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveCommunityMemberOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
};

export type RemoveCommunityMemberUserInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveGlobalAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveGlobalCommunityAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveGlobalHubsAdminInput = {
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveHubAdminInput = {
  hubID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveOpportunityAdminInput = {
  opportunityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveOrganizationAdminInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveOrganizationMemberInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveOrganizationOwnerInput = {
  organizationID: Scalars['UUID_NAMEID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RevokeAuthorizationCredentialInput = {
  /** The resource to which access is being removed. */
  resourceID: Scalars['String'];
  type: AuthorizationCredential;
  /** The user from whom the credential is being removed. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RolesOrganizationInput = {
  /** Return membership in Hubs matching the provided filter. */
  filter?: InputMaybe<HubFilterInput>;
  /** The ID of the organization to retrieve the roles of. */
  organizationID: Scalars['UUID_NAMEID'];
};

export type RolesResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
};

export type RolesResultCommunity = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** Details of the Groups in the Organizations the user is a member of */
  userGroups: Array<RolesResult>;
};

export type RolesResultHub = {
  /** Details of the Challenges the user is a member of */
  challenges: Array<RolesResultCommunity>;
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** The Hub ID */
  hubID: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** Details of the Opportunities the Contributor is a member of */
  opportunities: Array<RolesResultCommunity>;
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** Details of the Groups in the Organizations the user is a member of */
  userGroups: Array<RolesResult>;
};

export type RolesResultOrganization = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The Organization ID. */
  organizationID: Scalars['String'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** Details of the Groups in the Organizations the user is a member of */
  userGroups: Array<RolesResult>;
};

export type RolesUserInput = {
  /** Return membership in Hubs matching the provided filter. */
  filter?: InputMaybe<HubFilterInput>;
  /** The ID of the user to retrieve the roles of. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type SearchInput = {
  /** Restrict the search to only the specified challenges. Default is all Challenges. */
  challengesFilter?: InputMaybe<Array<Scalars['Float']>>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: InputMaybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Hub. Max 5. */
  terms: Array<Scalars['String']>;
  /** Restrict the search to only the specified entity types. Values allowed: user, group, organization, Default is all. */
  typesFilter?: InputMaybe<Array<Scalars['String']>>;
};

export type SearchResultEntry = {
  /** Each search result contains either a User, UserGroup or Organization */
  result?: Maybe<Searchable>;
  /** The score for this search result; more matches means a higher score. */
  score?: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms?: Maybe<Array<Scalars['String']>>;
};

export type Searchable = {
  id: Scalars['UUID'];
};

export type SendMessageOnCalloutInput = {
  /** The Callout the message is being sent to */
  calloutID: Scalars['UUID'];
  /** The message contents */
  message: Scalars['String'];
};

export type Sentry = {
  /** Flag indicating if the client should use Sentry for monitoring. */
  enabled: Scalars['Boolean'];
  /** URL to the Sentry endpoint. */
  endpoint: Scalars['String'];
  /** Flag indicating if PII should be submitted on Sentry events. */
  submitPII: Scalars['Boolean'];
};

export type ServiceMetadata = {
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Subscription = {
  /** Receive new comment on Aspect */
  aspectCommentsMessageReceived: AspectCommentsMessageReceived;
  /** Receive new Update messages on Communities the currently authenticated User is a member of. */
  calloutAspectCreated: CalloutAspectCreated;
  /** Receive comments on Callouts */
  calloutMessageReceived: CalloutMessageReceived;
  /** Receive updated content of a canvas */
  canvasContentUpdated: CanvasContentUpdated;
  /** Receive new Discussion messages */
  communicationDiscussionMessageReceived: CommunicationDiscussionMessageReceived;
  /** Receive updates on Discussions */
  communicationDiscussionUpdated: Discussion;
  /** Receive new Update messages on Communities the currently authenticated User is a member of. */
  communicationUpdateMessageReceived: CommunicationUpdateMessageReceived;
  /** Received on verified credentials change */
  profileVerifiedCredential: ProfileCredentialVerified;
};

export type SubscriptionAspectCommentsMessageReceivedArgs = {
  aspectID: Scalars['UUID'];
};

export type SubscriptionCalloutAspectCreatedArgs = {
  calloutID: Scalars['UUID'];
};

export type SubscriptionCalloutMessageReceivedArgs = {
  calloutIDs: Array<Scalars['UUID']>;
};

export type SubscriptionCanvasContentUpdatedArgs = {
  canvasIDs?: InputMaybe<Array<Scalars['UUID']>>;
};

export type SubscriptionCommunicationDiscussionMessageReceivedArgs = {
  discussionID: Scalars['UUID'];
};

export type SubscriptionCommunicationDiscussionUpdatedArgs = {
  communicationID: Scalars['UUID'];
};

export type SubscriptionCommunicationUpdateMessageReceivedArgs = {
  updatesIDs?: InputMaybe<Array<Scalars['UUID']>>;
};

export type Tagset = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type TagsetTemplate = {
  /** Tagset template name. */
  name: Scalars['String'];
  /** Tagset placeholder */
  placeholder?: Maybe<Scalars['String']>;
};

export type Template = {
  /** Challenge templates. */
  challenges: Array<ChallengeTemplate>;
  /** Template description. */
  description: Scalars['String'];
  /** Hub templates. */
  hubs: Array<PlatformHubTemplate>;
  /** Template name. */
  name: Scalars['String'];
  /** Opportunity templates. */
  opportunities: Array<OpportunityTemplate>;
  /** Challenge templates. */
  organizations: Array<OrganizationTemplate>;
  /** User templates. */
  users: Array<UserTemplate>;
};

export type TemplateInfo = {
  /** The description for this Template. */
  description: Scalars['Markdown'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The tags set on this Template. */
  tagset?: Maybe<Tagset>;
  /** The title for this Template. */
  title: Scalars['String'];
  /** The image associated with this Template`. */
  visual?: Maybe<Visual>;
};

export type TemplatesSet = {
  /** A single AspectTemplate */
  aspectTemplate?: Maybe<AspectTemplate>;
  /** The AspectTemplates in this TemplatesSet. */
  aspectTemplates: Array<AspectTemplate>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A single AspectTemplate */
  canvasTemplate?: Maybe<CanvasTemplate>;
  /** The CanvasTemplates in this TemplatesSet. */
  canvasTemplates: Array<CanvasTemplate>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A single AspectTemplate */
  lifecycleTemplate?: Maybe<LifecycleTemplate>;
  /** The LifecycleTemplates in this TemplatesSet. */
  lifecycleTemplates: Array<LifecycleTemplate>;
};

export type TemplatesSetAspectTemplateArgs = {
  ID: Scalars['UUID'];
};

export type TemplatesSetCanvasTemplateArgs = {
  ID: Scalars['UUID'];
};

export type TemplatesSetLifecycleTemplateArgs = {
  ID: Scalars['UUID'];
};

export type UpdateActorInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  impact?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateAspectInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Update the set of References for the Aspect. */
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  /** Update the tags on the Aspect. */
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateAspectTemplateInput = {
  ID: Scalars['UUID'];
  /** The default description to be pre-filled when users create Aspects based on this template. */
  defaultDescription?: InputMaybe<Scalars['Markdown']>;
  /** The meta information for this Template. */
  info?: InputMaybe<UpdateTemplateInfoInput>;
  /** The type of Aspects created from this Template. */
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCalloutInput = {
  ID: Scalars['UUID'];
  /** Callout description. */
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** State of the callout. */
  state?: InputMaybe<CalloutState>;
  /** Callout type. */
  type?: InputMaybe<CalloutType>;
};

export type UpdateCalloutVisibilityInput = {
  /** The identifier for the Callout whose visibility is to be updated. */
  calloutID: Scalars['String'];
  /** Visibility of the Callout. */
  visibility: CalloutVisibility;
};

export type UpdateCanvasDirectInput = {
  ID: Scalars['UUID'];
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateCanvasTemplateInput = {
  ID: Scalars['UUID'];
  /** The meta information for this Template. */
  info?: InputMaybe<UpdateTemplateInfoInput>;
  value?: InputMaybe<Scalars['JSON']>;
};

export type UpdateChallengeInnovationFlowInput = {
  /** ID of the Challenge */
  challengeID: Scalars['UUID'];
  /** The Innovation Flow template to use for the Challenge. */
  innovationFlowTemplateID: Scalars['UUID'];
};

export type UpdateChallengeInput = {
  ID: Scalars['UUID'];
  /** Update the contained Context entity. */
  context?: InputMaybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateChallengePreferenceInput = {
  /** ID of the Challenge */
  challengeID: Scalars['UUID'];
  /** Type of the challenge preference */
  type: ChallengePreferenceType;
  value: Scalars['String'];
};

export type UpdateContextInput = {
  background?: InputMaybe<Scalars['Markdown']>;
  impact?: InputMaybe<Scalars['Markdown']>;
  location?: InputMaybe<UpdateLocationInput>;
  /** Update the set of References for the Context. */
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  tagline?: InputMaybe<Scalars['String']>;
  vision?: InputMaybe<Scalars['Markdown']>;
  who?: InputMaybe<Scalars['Markdown']>;
};

export type UpdateDiscussionInput = {
  ID: Scalars['UUID'];
  /** The category for the Discussion */
  category?: InputMaybe<DiscussionCategory>;
  /** The description for the Discussion */
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateEcosystemModelInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
};

export type UpdateHubInput = {
  /** The ID or NameID of the Hub. */
  ID: Scalars['UUID_NAMEID'];
  /** Update the contained Context entity. */
  context?: InputMaybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** Update the host Organization for the Hub. */
  hostID?: InputMaybe<Scalars['UUID_NAMEID']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateHubPreferenceInput = {
  /** ID of the Hub */
  hubID: Scalars['UUID_NAMEID'];
  /** Type of the user preference */
  type: HubPreferenceType;
  value: Scalars['String'];
};

export type UpdateHubVisibilityInput = {
  /** The identifier for the Hub whose visibility is to be updated. */
  hubID: Scalars['String'];
  /** Visibility of the Hub. */
  visibility: HubVisibility;
};

export type UpdateLifecycleTemplateInput = {
  ID: Scalars['UUID'];
  /** The XState definition for this LifecycleTemplate. */
  definition?: InputMaybe<Scalars['LifecycleDefinition']>;
  /** The meta information for this Template. */
  info?: InputMaybe<UpdateTemplateInfoInput>;
};

export type UpdateLocationInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
};

export type UpdateOpportunityInnovationFlowInput = {
  /** The Innovation Flow template to use for the Opportunity. */
  innovationFlowTemplateID: Scalars['UUID'];
  /** ID of the Opportunity */
  opportunityID: Scalars['UUID'];
};

export type UpdateOpportunityInput = {
  ID: Scalars['UUID'];
  /** Update the contained Context entity. */
  context?: InputMaybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateOrganizationInput = {
  /** The ID or NameID of the Organization to update. */
  ID: Scalars['UUID_NAMEID'];
  contactEmail?: InputMaybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData?: InputMaybe<UpdateProfileInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateOrganizationPreferenceInput = {
  /** ID of the Organization */
  organizationID: Scalars['UUID_NAMEID'];
  /** Type of the organization preference */
  type: OrganizationPreferenceType;
  value: Scalars['String'];
};

export type UpdateProfileInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateLocationInput>;
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateProjectInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
};

export type UpdateReferenceInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateTemplateInfoInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
  accountUpn?: InputMaybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  phone?: InputMaybe<Scalars['String']>;
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Set this user profile as being used as a service account or not. */
  serviceProfile?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserPreferenceInput = {
  /** Type of the user preference */
  type: UserPreferenceType;
  /** ID of the User */
  userID: Scalars['UUID_NAMEID_EMAIL'];
  value: Scalars['String'];
};

export type UpdateVisualInput = {
  uri: Scalars['String'];
  visualID: Scalars['String'];
};

export type Updates = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Messages in this Updates. */
  messages?: Maybe<Array<Message>>;
};

export type UpdatesRemoveMessageInput = {
  /** The message id that should be removed */
  messageID: Scalars['String'];
  /** The Updates the message is being removed from. */
  updatesID: Scalars['UUID'];
};

export type UpdatesSendMessageInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Updates the message is being sent to */
  updatesID: Scalars['UUID'];
};

export type User = Searchable & {
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  /** The Agent representing this User. */
  agent?: Maybe<Agent>;
  /** The Authorization for this User. */
  authorization?: Maybe<Authorization>;
  /** The Community rooms this user is a member of */
  communityRooms?: Maybe<Array<CommunicationRoom>>;
  /** The direct rooms this user is a member of */
  directRooms?: Maybe<Array<DirectRoom>>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The email address for this User. */
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The phone number for this User. */
  phone: Scalars['String'];
  /** The preferences for this user */
  preferences: Array<Preference>;
  /** The Profile for this User. */
  profile?: Maybe<Profile>;
};

export type UserAuthorizationPrivilegesInput = {
  /** The authorization definition to evaluate the user credentials against. */
  authorizationID: Scalars['UUID'];
  /** The user to evaluate privileges granted based on held credentials. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type UserAuthorizationResetInput = {
  /** The identifier of the User whose Authorization Policy should be reset. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type UserFilterInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserGroup = Searchable & {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  id: Scalars['UUID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** Containing entity for this UserGroup. */
  parent?: Maybe<Groupable>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export enum UserPreferenceType {
  NotificationApplicationReceived = 'NOTIFICATION_APPLICATION_RECEIVED',
  NotificationApplicationSubmitted = 'NOTIFICATION_APPLICATION_SUBMITTED',
  NotificationAspectCommentCreated = 'NOTIFICATION_ASPECT_COMMENT_CREATED',
  NotificationAspectCreated = 'NOTIFICATION_ASPECT_CREATED',
  NotificationAspectCreatedAdmin = 'NOTIFICATION_ASPECT_CREATED_ADMIN',
  NotificationCalloutPublished = 'NOTIFICATION_CALLOUT_PUBLISHED',
  NotificationCommunicationDiscussionCreated = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED',
  NotificationCommunicationDiscussionCreatedAdmin = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED_ADMIN',
  NotificationCommunicationDiscussionResponse = 'NOTIFICATION_COMMUNICATION_DISCUSSION_RESPONSE',
  NotificationCommunicationUpdates = 'NOTIFICATION_COMMUNICATION_UPDATES',
  NotificationCommunicationUpdateSentAdmin = 'NOTIFICATION_COMMUNICATION_UPDATE_SENT_ADMIN',
  NotificationCommunityCollaborationInterestAdmin = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_ADMIN',
  NotificationCommunityCollaborationInterestUser = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_USER',
  NotificationCommunityNewMember = 'NOTIFICATION_COMMUNITY_NEW_MEMBER',
  NotificationCommunityNewMemberAdmin = 'NOTIFICATION_COMMUNITY_NEW_MEMBER_ADMIN',
  NotificationCommunityReviewSubmitted = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED',
  NotificationCommunityReviewSubmittedAdmin = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED_ADMIN',
  NotificationUserSignUp = 'NOTIFICATION_USER_SIGN_UP',
}

export type UserSendMessageInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The user a message is being sent to */
  receivingUserID: Scalars['String'];
};

export type UserTemplate = {
  /** User template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};

export type UsersWithAuthorizationCredentialInput = {
  /** The resource to which a credential needs to be bound. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  /** The type of credential. */
  type: AuthorizationCredential;
};

export type VerifiedCredential = {
  /** The time at which the credential is no longer valid */
  claims: Array<VerifiedCredentialClaim>;
  /** JSON for the context in the credential */
  context: Scalars['JSON'];
  /** The time at which the credential is no longer valid */
  expires: Scalars['String'];
  /** The time at which the credential was issued */
  issued: Scalars['String'];
  /** The party issuing the VC */
  issuer: Scalars['String'];
  /** The name of the VC */
  name: Scalars['String'];
  /** The type of VC */
  type: Scalars['String'];
};

export type VerifiedCredentialClaim = {
  /** The name of the claim */
  name: Scalars['JSON'];
  /** The value for the claim */
  value: Scalars['JSON'];
};

export type Visual = {
  allowedTypes: Array<Scalars['String']>;
  /** Aspect ratio width / height. */
  aspectRatio: Scalars['Float'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Maximum height resolution. */
  maxHeight: Scalars['Float'];
  /** Maximum width resolution. */
  maxWidth: Scalars['Float'];
  /** Minimum height resolution. */
  minHeight: Scalars['Float'];
  /** Minimum width resolution. */
  minWidth: Scalars['Float'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type VisualUploadImageInput = {
  visualID: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Activity>;
  ActivityEventType: ActivityEventType;
  ActivityLogInput: ActivityLogInput;
  Actor: ResolverTypeWrapper<Actor>;
  ActorGroup: ResolverTypeWrapper<ActorGroup>;
  Agent: ResolverTypeWrapper<Agent>;
  AgentBeginVerifiedCredentialOfferOutput: ResolverTypeWrapper<AgentBeginVerifiedCredentialOfferOutput>;
  AgentBeginVerifiedCredentialRequestOutput: ResolverTypeWrapper<AgentBeginVerifiedCredentialRequestOutput>;
  Application: ResolverTypeWrapper<Application>;
  ApplicationEventInput: ApplicationEventInput;
  ApplicationForRoleResult: ResolverTypeWrapper<ApplicationForRoleResult>;
  ApplicationTemplate: ResolverTypeWrapper<ApplicationTemplate>;
  Aspect: ResolverTypeWrapper<Aspect>;
  AspectCommentsMessageReceived: ResolverTypeWrapper<AspectCommentsMessageReceived>;
  AspectTemplate: ResolverTypeWrapper<AspectTemplate>;
  AssignChallengeAdminInput: AssignChallengeAdminInput;
  AssignCommunityLeadOrganizationInput: AssignCommunityLeadOrganizationInput;
  AssignCommunityLeadUserInput: AssignCommunityLeadUserInput;
  AssignCommunityMemberOrganizationInput: AssignCommunityMemberOrganizationInput;
  AssignCommunityMemberUserInput: AssignCommunityMemberUserInput;
  AssignGlobalAdminInput: AssignGlobalAdminInput;
  AssignGlobalCommunityAdminInput: AssignGlobalCommunityAdminInput;
  AssignGlobalHubsAdminInput: AssignGlobalHubsAdminInput;
  AssignHubAdminInput: AssignHubAdminInput;
  AssignOpportunityAdminInput: AssignOpportunityAdminInput;
  AssignOrganizationAdminInput: AssignOrganizationAdminInput;
  AssignOrganizationMemberInput: AssignOrganizationMemberInput;
  AssignOrganizationOwnerInput: AssignOrganizationOwnerInput;
  AssignUserGroupMemberInput: AssignUserGroupMemberInput;
  AuthenticationConfig: ResolverTypeWrapper<AuthenticationConfig>;
  AuthenticationProviderConfig: ResolverTypeWrapper<
    Omit<AuthenticationProviderConfig, 'config'> & {
      config: ResolversTypes['AuthenticationProviderConfigUnion'];
    }
  >;
  AuthenticationProviderConfigUnion: ResolversTypes['OryConfig'];
  Authorization: ResolverTypeWrapper<Authorization>;
  AuthorizationCredential: AuthorizationCredential;
  AuthorizationPolicyRuleCredential: ResolverTypeWrapper<AuthorizationPolicyRuleCredential>;
  AuthorizationPolicyRulePrivilege: ResolverTypeWrapper<AuthorizationPolicyRulePrivilege>;
  AuthorizationPolicyRuleVerifiedCredential: ResolverTypeWrapper<AuthorizationPolicyRuleVerifiedCredential>;
  AuthorizationPrivilege: AuthorizationPrivilege;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Callout: ResolverTypeWrapper<Callout>;
  CalloutAspectCreated: ResolverTypeWrapper<CalloutAspectCreated>;
  CalloutMessageReceived: ResolverTypeWrapper<CalloutMessageReceived>;
  CalloutState: CalloutState;
  CalloutType: CalloutType;
  CalloutVisibility: CalloutVisibility;
  Canvas: ResolverTypeWrapper<Canvas>;
  CanvasCheckout: ResolverTypeWrapper<CanvasCheckout>;
  CanvasCheckoutEventInput: CanvasCheckoutEventInput;
  CanvasCheckoutStateEnum: CanvasCheckoutStateEnum;
  CanvasContentUpdated: ResolverTypeWrapper<CanvasContentUpdated>;
  CanvasTemplate: ResolverTypeWrapper<CanvasTemplate>;
  Challenge: ResolverTypeWrapper<Challenge>;
  ChallengeEventInput: ChallengeEventInput;
  ChallengePreferenceType: ChallengePreferenceType;
  ChallengeTemplate: ResolverTypeWrapper<ChallengeTemplate>;
  Collaboration: ResolverTypeWrapper<Collaboration>;
  Comments: ResolverTypeWrapper<Comments>;
  CommentsRemoveMessageInput: CommentsRemoveMessageInput;
  CommentsSendMessageInput: CommentsSendMessageInput;
  Communication: ResolverTypeWrapper<Communication>;
  CommunicationAdminEnsureAccessInput: CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: ResolverTypeWrapper<CommunicationAdminMembershipResult>;
  CommunicationAdminOrphanedUsageResult: ResolverTypeWrapper<CommunicationAdminOrphanedUsageResult>;
  CommunicationAdminRemoveOrphanedRoomInput: CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: ResolverTypeWrapper<CommunicationAdminRoomMembershipResult>;
  CommunicationAdminRoomResult: ResolverTypeWrapper<CommunicationAdminRoomResult>;
  CommunicationAdminUpdateRoomsJoinRuleInput: CommunicationAdminUpdateRoomsJoinRuleInput;
  CommunicationCreateDiscussionInput: CommunicationCreateDiscussionInput;
  CommunicationDiscussionMessageReceived: ResolverTypeWrapper<CommunicationDiscussionMessageReceived>;
  CommunicationRoom: ResolverTypeWrapper<CommunicationRoom>;
  CommunicationUpdateMessageReceived: ResolverTypeWrapper<CommunicationUpdateMessageReceived>;
  Community: ResolverTypeWrapper<Community>;
  CommunityApplyInput: CommunityApplyInput;
  CommunityJoinInput: CommunityJoinInput;
  CommunityPolicy: ResolverTypeWrapper<CommunityPolicy>;
  CommunityPolicyRole: ResolverTypeWrapper<CommunityPolicyRole>;
  Config: ResolverTypeWrapper<Config>;
  Context: ResolverTypeWrapper<Context>;
  ContributorFilterInput: ContributorFilterInput;
  ContributorRoles: ResolverTypeWrapper<ContributorRoles>;
  ConvertChallengeToHubInput: ConvertChallengeToHubInput;
  ConvertOpportunityToChallengeInput: ConvertOpportunityToChallengeInput;
  CreateActorGroupInput: CreateActorGroupInput;
  CreateActorInput: CreateActorInput;
  CreateAspectOnCalloutInput: CreateAspectOnCalloutInput;
  CreateAspectTemplateOnTemplatesSetInput: CreateAspectTemplateOnTemplatesSetInput;
  CreateCalloutOnCollaborationInput: CreateCalloutOnCollaborationInput;
  CreateCanvasOnCalloutInput: CreateCanvasOnCalloutInput;
  CreateCanvasTemplateOnTemplatesSetInput: CreateCanvasTemplateOnTemplatesSetInput;
  CreateChallengeOnChallengeInput: CreateChallengeOnChallengeInput;
  CreateChallengeOnHubInput: CreateChallengeOnHubInput;
  CreateContextInput: CreateContextInput;
  CreateFeedbackOnCommunityContextInput: CreateFeedbackOnCommunityContextInput;
  CreateHubInput: CreateHubInput;
  CreateLifecycleTemplateOnTemplatesSetInput: CreateLifecycleTemplateOnTemplatesSetInput;
  CreateLocationInput: CreateLocationInput;
  CreateNVPInput: CreateNvpInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateProfileInput: CreateProfileInput;
  CreateProjectInput: CreateProjectInput;
  CreateReferenceInput: CreateReferenceInput;
  CreateReferenceOnAspectInput: CreateReferenceOnAspectInput;
  CreateReferenceOnContextInput: CreateReferenceOnContextInput;
  CreateReferenceOnProfileInput: CreateReferenceOnProfileInput;
  CreateRelationOnCollaborationInput: CreateRelationOnCollaborationInput;
  CreateTagsetInput: CreateTagsetInput;
  CreateTagsetOnProfileInput: CreateTagsetOnProfileInput;
  CreateTemplateInfoInput: CreateTemplateInfoInput;
  CreateUserGroupInput: CreateUserGroupInput;
  CreateUserInput: CreateUserInput;
  Credential: ResolverTypeWrapper<Credential>;
  CredentialDefinition: ResolverTypeWrapper<CredentialDefinition>;
  CredentialMetadataOutput: ResolverTypeWrapper<CredentialMetadataOutput>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteActorGroupInput: DeleteActorGroupInput;
  DeleteActorInput: DeleteActorInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteAspectInput: DeleteAspectInput;
  DeleteAspectTemplateInput: DeleteAspectTemplateInput;
  DeleteCalloutInput: DeleteCalloutInput;
  DeleteCanvasInput: DeleteCanvasInput;
  DeleteCanvasTemplateInput: DeleteCanvasTemplateInput;
  DeleteChallengeInput: DeleteChallengeInput;
  DeleteCollaborationInput: DeleteCollaborationInput;
  DeleteDiscussionInput: DeleteDiscussionInput;
  DeleteHubInput: DeleteHubInput;
  DeleteLifecycleTemplateInput: DeleteLifecycleTemplateInput;
  DeleteOpportunityInput: DeleteOpportunityInput;
  DeleteOrganizationInput: DeleteOrganizationInput;
  DeleteProjectInput: DeleteProjectInput;
  DeleteReferenceInput: DeleteReferenceInput;
  DeleteRelationInput: DeleteRelationInput;
  DeleteUserGroupInput: DeleteUserGroupInput;
  DeleteUserInput: DeleteUserInput;
  DirectRoom: ResolverTypeWrapper<DirectRoom>;
  Discussion: ResolverTypeWrapper<Discussion>;
  DiscussionCategory: DiscussionCategory;
  DiscussionRemoveMessageInput: DiscussionRemoveMessageInput;
  DiscussionSendMessageInput: DiscussionSendMessageInput;
  EcosystemModel: ResolverTypeWrapper<EcosystemModel>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  FeedbackTemplate: ResolverTypeWrapper<FeedbackTemplate>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GrantAuthorizationCredentialInput: GrantAuthorizationCredentialInput;
  Groupable: ResolversTypes['Community'] | ResolversTypes['Organization'];
  Hub: ResolverTypeWrapper<Hub>;
  HubAspectTemplate: ResolverTypeWrapper<HubAspectTemplate>;
  HubAuthorizationResetInput: HubAuthorizationResetInput;
  HubFilterInput: HubFilterInput;
  HubPreferenceType: HubPreferenceType;
  HubVisibility: HubVisibility;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Lifecycle: ResolverTypeWrapper<Lifecycle>;
  LifecycleDefinition: ResolverTypeWrapper<Scalars['LifecycleDefinition']>;
  LifecycleTemplate: ResolverTypeWrapper<LifecycleTemplate>;
  LifecycleType: LifecycleType;
  Location: ResolverTypeWrapper<Location>;
  Markdown: ResolverTypeWrapper<Scalars['Markdown']>;
  Message: ResolverTypeWrapper<Message>;
  MessageID: ResolverTypeWrapper<Scalars['MessageID']>;
  Metadata: ResolverTypeWrapper<Metadata>;
  Mutation: ResolverTypeWrapper<{}>;
  NVP: ResolverTypeWrapper<Nvp>;
  NameID: ResolverTypeWrapper<Scalars['NameID']>;
  Opportunity: ResolverTypeWrapper<Opportunity>;
  OpportunityEventInput: OpportunityEventInput;
  OpportunityTemplate: ResolverTypeWrapper<OpportunityTemplate>;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationAuthorizationResetInput: OrganizationAuthorizationResetInput;
  OrganizationFilterInput: OrganizationFilterInput;
  OrganizationPreferenceType: OrganizationPreferenceType;
  OrganizationTemplate: ResolverTypeWrapper<OrganizationTemplate>;
  OrganizationVerification: ResolverTypeWrapper<OrganizationVerification>;
  OrganizationVerificationEnum: OrganizationVerificationEnum;
  OrganizationVerificationEventInput: OrganizationVerificationEventInput;
  OryConfig: ResolverTypeWrapper<OryConfig>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginatedOrganization: ResolverTypeWrapper<PaginatedOrganization>;
  PaginatedUsers: ResolverTypeWrapper<PaginatedUsers>;
  Platform: ResolverTypeWrapper<Platform>;
  PlatformHubTemplate: ResolverTypeWrapper<PlatformHubTemplate>;
  Preference: ResolverTypeWrapper<Preference>;
  PreferenceDefinition: ResolverTypeWrapper<PreferenceDefinition>;
  PreferenceType: PreferenceType;
  PreferenceValueType: PreferenceValueType;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileCredentialVerified: ResolverTypeWrapper<ProfileCredentialVerified>;
  Project: ResolverTypeWrapper<Project>;
  ProjectEventInput: ProjectEventInput;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionTemplate: ResolverTypeWrapper<QuestionTemplate>;
  Reference: ResolverTypeWrapper<Reference>;
  Relation: ResolverTypeWrapper<Relation>;
  RelayPaginatedUser: ResolverTypeWrapper<RelayPaginatedUser>;
  RelayPaginatedUserEdge: ResolverTypeWrapper<RelayPaginatedUserEdge>;
  RelayPaginatedUserPageInfo: ResolverTypeWrapper<RelayPaginatedUserPageInfo>;
  RemoveChallengeAdminInput: RemoveChallengeAdminInput;
  RemoveCommunityLeadOrganizationInput: RemoveCommunityLeadOrganizationInput;
  RemoveCommunityLeadUserInput: RemoveCommunityLeadUserInput;
  RemoveCommunityMemberOrganizationInput: RemoveCommunityMemberOrganizationInput;
  RemoveCommunityMemberUserInput: RemoveCommunityMemberUserInput;
  RemoveGlobalAdminInput: RemoveGlobalAdminInput;
  RemoveGlobalCommunityAdminInput: RemoveGlobalCommunityAdminInput;
  RemoveGlobalHubsAdminInput: RemoveGlobalHubsAdminInput;
  RemoveHubAdminInput: RemoveHubAdminInput;
  RemoveOpportunityAdminInput: RemoveOpportunityAdminInput;
  RemoveOrganizationAdminInput: RemoveOrganizationAdminInput;
  RemoveOrganizationMemberInput: RemoveOrganizationMemberInput;
  RemoveOrganizationOwnerInput: RemoveOrganizationOwnerInput;
  RemoveUserGroupMemberInput: RemoveUserGroupMemberInput;
  RevokeAuthorizationCredentialInput: RevokeAuthorizationCredentialInput;
  RolesOrganizationInput: RolesOrganizationInput;
  RolesResult: ResolverTypeWrapper<RolesResult>;
  RolesResultCommunity: ResolverTypeWrapper<RolesResultCommunity>;
  RolesResultHub: ResolverTypeWrapper<RolesResultHub>;
  RolesResultOrganization: ResolverTypeWrapper<RolesResultOrganization>;
  RolesUserInput: RolesUserInput;
  SearchInput: SearchInput;
  SearchResultEntry: ResolverTypeWrapper<SearchResultEntry>;
  Searchable:
    | ResolversTypes['Challenge']
    | ResolversTypes['Hub']
    | ResolversTypes['Opportunity']
    | ResolversTypes['Organization']
    | ResolversTypes['RelayPaginatedUser']
    | ResolversTypes['User']
    | ResolversTypes['UserGroup'];
  SendMessageOnCalloutInput: SendMessageOnCalloutInput;
  Sentry: ResolverTypeWrapper<Sentry>;
  ServiceMetadata: ResolverTypeWrapper<ServiceMetadata>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Tagset: ResolverTypeWrapper<Tagset>;
  TagsetTemplate: ResolverTypeWrapper<TagsetTemplate>;
  Template: ResolverTypeWrapper<Template>;
  TemplateInfo: ResolverTypeWrapper<TemplateInfo>;
  TemplatesSet: ResolverTypeWrapper<TemplatesSet>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UUID_NAMEID: ResolverTypeWrapper<Scalars['UUID_NAMEID']>;
  UUID_NAMEID_EMAIL: ResolverTypeWrapper<Scalars['UUID_NAMEID_EMAIL']>;
  UpdateActorInput: UpdateActorInput;
  UpdateAspectInput: UpdateAspectInput;
  UpdateAspectTemplateInput: UpdateAspectTemplateInput;
  UpdateCalloutInput: UpdateCalloutInput;
  UpdateCalloutVisibilityInput: UpdateCalloutVisibilityInput;
  UpdateCanvasDirectInput: UpdateCanvasDirectInput;
  UpdateCanvasTemplateInput: UpdateCanvasTemplateInput;
  UpdateChallengeInnovationFlowInput: UpdateChallengeInnovationFlowInput;
  UpdateChallengeInput: UpdateChallengeInput;
  UpdateChallengePreferenceInput: UpdateChallengePreferenceInput;
  UpdateContextInput: UpdateContextInput;
  UpdateDiscussionInput: UpdateDiscussionInput;
  UpdateEcosystemModelInput: UpdateEcosystemModelInput;
  UpdateHubInput: UpdateHubInput;
  UpdateHubPreferenceInput: UpdateHubPreferenceInput;
  UpdateHubVisibilityInput: UpdateHubVisibilityInput;
  UpdateLifecycleTemplateInput: UpdateLifecycleTemplateInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateOpportunityInnovationFlowInput: UpdateOpportunityInnovationFlowInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateOrganizationPreferenceInput: UpdateOrganizationPreferenceInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateReferenceInput: UpdateReferenceInput;
  UpdateTagsetInput: UpdateTagsetInput;
  UpdateTemplateInfoInput: UpdateTemplateInfoInput;
  UpdateUserGroupInput: UpdateUserGroupInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPreferenceInput: UpdateUserPreferenceInput;
  UpdateVisualInput: UpdateVisualInput;
  Updates: ResolverTypeWrapper<Updates>;
  UpdatesRemoveMessageInput: UpdatesRemoveMessageInput;
  UpdatesSendMessageInput: UpdatesSendMessageInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserAuthorizationPrivilegesInput: UserAuthorizationPrivilegesInput;
  UserAuthorizationResetInput: UserAuthorizationResetInput;
  UserFilterInput: UserFilterInput;
  UserGroup: ResolverTypeWrapper<UserGroup>;
  UserPreferenceType: UserPreferenceType;
  UserSendMessageInput: UserSendMessageInput;
  UserTemplate: ResolverTypeWrapper<UserTemplate>;
  UsersWithAuthorizationCredentialInput: UsersWithAuthorizationCredentialInput;
  VerifiedCredential: ResolverTypeWrapper<VerifiedCredential>;
  VerifiedCredentialClaim: ResolverTypeWrapper<VerifiedCredentialClaim>;
  Visual: ResolverTypeWrapper<Visual>;
  VisualUploadImageInput: VisualUploadImageInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Activity;
  ActivityLogInput: ActivityLogInput;
  Actor: Actor;
  ActorGroup: ActorGroup;
  Agent: Agent;
  AgentBeginVerifiedCredentialOfferOutput: AgentBeginVerifiedCredentialOfferOutput;
  AgentBeginVerifiedCredentialRequestOutput: AgentBeginVerifiedCredentialRequestOutput;
  Application: Application;
  ApplicationEventInput: ApplicationEventInput;
  ApplicationForRoleResult: ApplicationForRoleResult;
  ApplicationTemplate: ApplicationTemplate;
  Aspect: Aspect;
  AspectCommentsMessageReceived: AspectCommentsMessageReceived;
  AspectTemplate: AspectTemplate;
  AssignChallengeAdminInput: AssignChallengeAdminInput;
  AssignCommunityLeadOrganizationInput: AssignCommunityLeadOrganizationInput;
  AssignCommunityLeadUserInput: AssignCommunityLeadUserInput;
  AssignCommunityMemberOrganizationInput: AssignCommunityMemberOrganizationInput;
  AssignCommunityMemberUserInput: AssignCommunityMemberUserInput;
  AssignGlobalAdminInput: AssignGlobalAdminInput;
  AssignGlobalCommunityAdminInput: AssignGlobalCommunityAdminInput;
  AssignGlobalHubsAdminInput: AssignGlobalHubsAdminInput;
  AssignHubAdminInput: AssignHubAdminInput;
  AssignOpportunityAdminInput: AssignOpportunityAdminInput;
  AssignOrganizationAdminInput: AssignOrganizationAdminInput;
  AssignOrganizationMemberInput: AssignOrganizationMemberInput;
  AssignOrganizationOwnerInput: AssignOrganizationOwnerInput;
  AssignUserGroupMemberInput: AssignUserGroupMemberInput;
  AuthenticationConfig: AuthenticationConfig;
  AuthenticationProviderConfig: Omit<AuthenticationProviderConfig, 'config'> & {
    config: ResolversParentTypes['AuthenticationProviderConfigUnion'];
  };
  AuthenticationProviderConfigUnion: ResolversParentTypes['OryConfig'];
  Authorization: Authorization;
  AuthorizationPolicyRuleCredential: AuthorizationPolicyRuleCredential;
  AuthorizationPolicyRulePrivilege: AuthorizationPolicyRulePrivilege;
  AuthorizationPolicyRuleVerifiedCredential: AuthorizationPolicyRuleVerifiedCredential;
  Boolean: Scalars['Boolean'];
  Callout: Callout;
  CalloutAspectCreated: CalloutAspectCreated;
  CalloutMessageReceived: CalloutMessageReceived;
  Canvas: Canvas;
  CanvasCheckout: CanvasCheckout;
  CanvasCheckoutEventInput: CanvasCheckoutEventInput;
  CanvasContentUpdated: CanvasContentUpdated;
  CanvasTemplate: CanvasTemplate;
  Challenge: Challenge;
  ChallengeEventInput: ChallengeEventInput;
  ChallengeTemplate: ChallengeTemplate;
  Collaboration: Collaboration;
  Comments: Comments;
  CommentsRemoveMessageInput: CommentsRemoveMessageInput;
  CommentsSendMessageInput: CommentsSendMessageInput;
  Communication: Communication;
  CommunicationAdminEnsureAccessInput: CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: CommunicationAdminMembershipResult;
  CommunicationAdminOrphanedUsageResult: CommunicationAdminOrphanedUsageResult;
  CommunicationAdminRemoveOrphanedRoomInput: CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: CommunicationAdminRoomMembershipResult;
  CommunicationAdminRoomResult: CommunicationAdminRoomResult;
  CommunicationAdminUpdateRoomsJoinRuleInput: CommunicationAdminUpdateRoomsJoinRuleInput;
  CommunicationCreateDiscussionInput: CommunicationCreateDiscussionInput;
  CommunicationDiscussionMessageReceived: CommunicationDiscussionMessageReceived;
  CommunicationRoom: CommunicationRoom;
  CommunicationUpdateMessageReceived: CommunicationUpdateMessageReceived;
  Community: Community;
  CommunityApplyInput: CommunityApplyInput;
  CommunityJoinInput: CommunityJoinInput;
  CommunityPolicy: CommunityPolicy;
  CommunityPolicyRole: CommunityPolicyRole;
  Config: Config;
  Context: Context;
  ContributorFilterInput: ContributorFilterInput;
  ContributorRoles: ContributorRoles;
  ConvertChallengeToHubInput: ConvertChallengeToHubInput;
  ConvertOpportunityToChallengeInput: ConvertOpportunityToChallengeInput;
  CreateActorGroupInput: CreateActorGroupInput;
  CreateActorInput: CreateActorInput;
  CreateAspectOnCalloutInput: CreateAspectOnCalloutInput;
  CreateAspectTemplateOnTemplatesSetInput: CreateAspectTemplateOnTemplatesSetInput;
  CreateCalloutOnCollaborationInput: CreateCalloutOnCollaborationInput;
  CreateCanvasOnCalloutInput: CreateCanvasOnCalloutInput;
  CreateCanvasTemplateOnTemplatesSetInput: CreateCanvasTemplateOnTemplatesSetInput;
  CreateChallengeOnChallengeInput: CreateChallengeOnChallengeInput;
  CreateChallengeOnHubInput: CreateChallengeOnHubInput;
  CreateContextInput: CreateContextInput;
  CreateFeedbackOnCommunityContextInput: CreateFeedbackOnCommunityContextInput;
  CreateHubInput: CreateHubInput;
  CreateLifecycleTemplateOnTemplatesSetInput: CreateLifecycleTemplateOnTemplatesSetInput;
  CreateLocationInput: CreateLocationInput;
  CreateNVPInput: CreateNvpInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateProfileInput: CreateProfileInput;
  CreateProjectInput: CreateProjectInput;
  CreateReferenceInput: CreateReferenceInput;
  CreateReferenceOnAspectInput: CreateReferenceOnAspectInput;
  CreateReferenceOnContextInput: CreateReferenceOnContextInput;
  CreateReferenceOnProfileInput: CreateReferenceOnProfileInput;
  CreateRelationOnCollaborationInput: CreateRelationOnCollaborationInput;
  CreateTagsetInput: CreateTagsetInput;
  CreateTagsetOnProfileInput: CreateTagsetOnProfileInput;
  CreateTemplateInfoInput: CreateTemplateInfoInput;
  CreateUserGroupInput: CreateUserGroupInput;
  CreateUserInput: CreateUserInput;
  Credential: Credential;
  CredentialDefinition: CredentialDefinition;
  CredentialMetadataOutput: CredentialMetadataOutput;
  DID: Scalars['DID'];
  DateTime: Scalars['DateTime'];
  DeleteActorGroupInput: DeleteActorGroupInput;
  DeleteActorInput: DeleteActorInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteAspectInput: DeleteAspectInput;
  DeleteAspectTemplateInput: DeleteAspectTemplateInput;
  DeleteCalloutInput: DeleteCalloutInput;
  DeleteCanvasInput: DeleteCanvasInput;
  DeleteCanvasTemplateInput: DeleteCanvasTemplateInput;
  DeleteChallengeInput: DeleteChallengeInput;
  DeleteCollaborationInput: DeleteCollaborationInput;
  DeleteDiscussionInput: DeleteDiscussionInput;
  DeleteHubInput: DeleteHubInput;
  DeleteLifecycleTemplateInput: DeleteLifecycleTemplateInput;
  DeleteOpportunityInput: DeleteOpportunityInput;
  DeleteOrganizationInput: DeleteOrganizationInput;
  DeleteProjectInput: DeleteProjectInput;
  DeleteReferenceInput: DeleteReferenceInput;
  DeleteRelationInput: DeleteRelationInput;
  DeleteUserGroupInput: DeleteUserGroupInput;
  DeleteUserInput: DeleteUserInput;
  DirectRoom: DirectRoom;
  Discussion: Discussion;
  DiscussionRemoveMessageInput: DiscussionRemoveMessageInput;
  DiscussionSendMessageInput: DiscussionSendMessageInput;
  EcosystemModel: EcosystemModel;
  FeatureFlag: FeatureFlag;
  FeedbackTemplate: FeedbackTemplate;
  Float: Scalars['Float'];
  GrantAuthorizationCredentialInput: GrantAuthorizationCredentialInput;
  Groupable:
    | ResolversParentTypes['Community']
    | ResolversParentTypes['Organization'];
  Hub: Hub;
  HubAspectTemplate: HubAspectTemplate;
  HubAuthorizationResetInput: HubAuthorizationResetInput;
  HubFilterInput: HubFilterInput;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Lifecycle: Lifecycle;
  LifecycleDefinition: Scalars['LifecycleDefinition'];
  LifecycleTemplate: LifecycleTemplate;
  Location: Location;
  Markdown: Scalars['Markdown'];
  Message: Message;
  MessageID: Scalars['MessageID'];
  Metadata: Metadata;
  Mutation: {};
  NVP: Nvp;
  NameID: Scalars['NameID'];
  Opportunity: Opportunity;
  OpportunityEventInput: OpportunityEventInput;
  OpportunityTemplate: OpportunityTemplate;
  Organization: Organization;
  OrganizationAuthorizationResetInput: OrganizationAuthorizationResetInput;
  OrganizationFilterInput: OrganizationFilterInput;
  OrganizationTemplate: OrganizationTemplate;
  OrganizationVerification: OrganizationVerification;
  OrganizationVerificationEventInput: OrganizationVerificationEventInput;
  OryConfig: OryConfig;
  PageInfo: PageInfo;
  PaginatedOrganization: PaginatedOrganization;
  PaginatedUsers: PaginatedUsers;
  Platform: Platform;
  PlatformHubTemplate: PlatformHubTemplate;
  Preference: Preference;
  PreferenceDefinition: PreferenceDefinition;
  Profile: Profile;
  ProfileCredentialVerified: ProfileCredentialVerified;
  Project: Project;
  ProjectEventInput: ProjectEventInput;
  Query: {};
  Question: Question;
  QuestionTemplate: QuestionTemplate;
  Reference: Reference;
  Relation: Relation;
  RelayPaginatedUser: RelayPaginatedUser;
  RelayPaginatedUserEdge: RelayPaginatedUserEdge;
  RelayPaginatedUserPageInfo: RelayPaginatedUserPageInfo;
  RemoveChallengeAdminInput: RemoveChallengeAdminInput;
  RemoveCommunityLeadOrganizationInput: RemoveCommunityLeadOrganizationInput;
  RemoveCommunityLeadUserInput: RemoveCommunityLeadUserInput;
  RemoveCommunityMemberOrganizationInput: RemoveCommunityMemberOrganizationInput;
  RemoveCommunityMemberUserInput: RemoveCommunityMemberUserInput;
  RemoveGlobalAdminInput: RemoveGlobalAdminInput;
  RemoveGlobalCommunityAdminInput: RemoveGlobalCommunityAdminInput;
  RemoveGlobalHubsAdminInput: RemoveGlobalHubsAdminInput;
  RemoveHubAdminInput: RemoveHubAdminInput;
  RemoveOpportunityAdminInput: RemoveOpportunityAdminInput;
  RemoveOrganizationAdminInput: RemoveOrganizationAdminInput;
  RemoveOrganizationMemberInput: RemoveOrganizationMemberInput;
  RemoveOrganizationOwnerInput: RemoveOrganizationOwnerInput;
  RemoveUserGroupMemberInput: RemoveUserGroupMemberInput;
  RevokeAuthorizationCredentialInput: RevokeAuthorizationCredentialInput;
  RolesOrganizationInput: RolesOrganizationInput;
  RolesResult: RolesResult;
  RolesResultCommunity: RolesResultCommunity;
  RolesResultHub: RolesResultHub;
  RolesResultOrganization: RolesResultOrganization;
  RolesUserInput: RolesUserInput;
  SearchInput: SearchInput;
  SearchResultEntry: SearchResultEntry;
  Searchable:
    | ResolversParentTypes['Challenge']
    | ResolversParentTypes['Hub']
    | ResolversParentTypes['Opportunity']
    | ResolversParentTypes['Organization']
    | ResolversParentTypes['RelayPaginatedUser']
    | ResolversParentTypes['User']
    | ResolversParentTypes['UserGroup'];
  SendMessageOnCalloutInput: SendMessageOnCalloutInput;
  Sentry: Sentry;
  ServiceMetadata: ServiceMetadata;
  String: Scalars['String'];
  Subscription: {};
  Tagset: Tagset;
  TagsetTemplate: TagsetTemplate;
  Template: Template;
  TemplateInfo: TemplateInfo;
  TemplatesSet: TemplatesSet;
  UUID: Scalars['UUID'];
  UUID_NAMEID: Scalars['UUID_NAMEID'];
  UUID_NAMEID_EMAIL: Scalars['UUID_NAMEID_EMAIL'];
  UpdateActorInput: UpdateActorInput;
  UpdateAspectInput: UpdateAspectInput;
  UpdateAspectTemplateInput: UpdateAspectTemplateInput;
  UpdateCalloutInput: UpdateCalloutInput;
  UpdateCalloutVisibilityInput: UpdateCalloutVisibilityInput;
  UpdateCanvasDirectInput: UpdateCanvasDirectInput;
  UpdateCanvasTemplateInput: UpdateCanvasTemplateInput;
  UpdateChallengeInnovationFlowInput: UpdateChallengeInnovationFlowInput;
  UpdateChallengeInput: UpdateChallengeInput;
  UpdateChallengePreferenceInput: UpdateChallengePreferenceInput;
  UpdateContextInput: UpdateContextInput;
  UpdateDiscussionInput: UpdateDiscussionInput;
  UpdateEcosystemModelInput: UpdateEcosystemModelInput;
  UpdateHubInput: UpdateHubInput;
  UpdateHubPreferenceInput: UpdateHubPreferenceInput;
  UpdateHubVisibilityInput: UpdateHubVisibilityInput;
  UpdateLifecycleTemplateInput: UpdateLifecycleTemplateInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateOpportunityInnovationFlowInput: UpdateOpportunityInnovationFlowInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateOrganizationPreferenceInput: UpdateOrganizationPreferenceInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateReferenceInput: UpdateReferenceInput;
  UpdateTagsetInput: UpdateTagsetInput;
  UpdateTemplateInfoInput: UpdateTemplateInfoInput;
  UpdateUserGroupInput: UpdateUserGroupInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPreferenceInput: UpdateUserPreferenceInput;
  UpdateVisualInput: UpdateVisualInput;
  Updates: Updates;
  UpdatesRemoveMessageInput: UpdatesRemoveMessageInput;
  UpdatesSendMessageInput: UpdatesSendMessageInput;
  Upload: Scalars['Upload'];
  User: User;
  UserAuthorizationPrivilegesInput: UserAuthorizationPrivilegesInput;
  UserAuthorizationResetInput: UserAuthorizationResetInput;
  UserFilterInput: UserFilterInput;
  UserGroup: UserGroup;
  UserSendMessageInput: UserSendMessageInput;
  UserTemplate: UserTemplate;
  UsersWithAuthorizationCredentialInput: UsersWithAuthorizationCredentialInput;
  VerifiedCredential: VerifiedCredential;
  VerifiedCredentialClaim: VerifiedCredentialClaim;
  Visual: Visual;
  VisualUploadImageInput: VisualUploadImageInput;
};

export type ActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']
> = {
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentID?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  resourceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  impact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActorGroup'] = ResolversParentTypes['ActorGroup']
> = {
  actors?: Resolver<
    Maybe<Array<ResolversTypes['Actor']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Agent'] = ResolversParentTypes['Agent']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  credentials?: Resolver<
    Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  did?: Resolver<Maybe<ResolversTypes['DID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  verifiedCredentials?: Resolver<
    Maybe<Array<ResolversTypes['VerifiedCredential']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentBeginVerifiedCredentialOfferOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AgentBeginVerifiedCredentialOfferOutput'] = ResolversParentTypes['AgentBeginVerifiedCredentialOfferOutput']
> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qrCodeImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentBeginVerifiedCredentialRequestOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AgentBeginVerifiedCredentialRequestOutput'] = ResolversParentTypes['AgentBeginVerifiedCredentialRequestOutput']
> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qrCodeImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['Question']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationForRoleResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ApplicationForRoleResult'] = ResolversParentTypes['ApplicationForRoleResult']
> = {
  challengeID?: Resolver<
    Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hubID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  opportunityID?: Resolver<
    Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ApplicationTemplate'] = ResolversParentTypes['ApplicationTemplate']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['QuestionTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AspectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Aspect'] = ResolversParentTypes['Aspect']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  banner?: Resolver<Maybe<ResolversTypes['Visual']>, ParentType, ContextType>;
  bannerNarrow?: Resolver<
    Maybe<ResolversTypes['Visual']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Maybe<ResolversTypes['Comments']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  references?: Resolver<
    Maybe<Array<ResolversTypes['Reference']>>,
    ParentType,
    ContextType
  >;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AspectCommentsMessageReceivedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AspectCommentsMessageReceived'] = ResolversParentTypes['AspectCommentsMessageReceived']
> = {
  aspectID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AspectTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AspectTemplate'] = ResolversParentTypes['AspectTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  defaultDescription?: Resolver<
    ResolversTypes['Markdown'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['TemplateInfo'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationConfig'] = ResolversParentTypes['AuthenticationConfig']
> = {
  providers?: Resolver<
    Array<ResolversTypes['AuthenticationProviderConfig']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfig'] = ResolversParentTypes['AuthenticationProviderConfig']
> = {
  config?: Resolver<
    ResolversTypes['AuthenticationProviderConfigUnion'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigUnionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfigUnion'] = ResolversParentTypes['AuthenticationProviderConfigUnion']
> = {
  __resolveType: TypeResolveFn<'OryConfig', ParentType, ContextType>;
};

export type AuthorizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Authorization'] = ResolversParentTypes['Authorization']
> = {
  anonymousReadAccess?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  credentialRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRuleCredential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  myPrivileges?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType
  >;
  privilegeRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRulePrivilege']>>,
    ParentType,
    ContextType
  >;
  verifiedCredentialRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRuleVerifiedCredential']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRuleCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRuleCredential'] = ResolversParentTypes['AuthorizationPolicyRuleCredential']
> = {
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  inheritable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRulePrivilegeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRulePrivilege'] = ResolversParentTypes['AuthorizationPolicyRulePrivilege']
> = {
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  sourcePrivilege?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRuleVerifiedCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRuleVerifiedCredential'] = ResolversParentTypes['AuthorizationPolicyRuleVerifiedCredential']
> = {
  claimRule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  credentialName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Callout'] = ResolversParentTypes['Callout']
> = {
  aspects?: Resolver<
    Maybe<Array<ResolversTypes['Aspect']>>,
    ParentType,
    ContextType,
    Partial<CalloutAspectsArgs>
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  canvases?: Resolver<
    Maybe<Array<ResolversTypes['Canvas']>>,
    ParentType,
    ContextType,
    Partial<CalloutCanvasesArgs>
  >;
  comments?: Resolver<
    Maybe<ResolversTypes['Comments']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['CalloutState'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CalloutType'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['CalloutVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutAspectCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutAspectCreated'] = ResolversParentTypes['CalloutAspectCreated']
> = {
  aspect?: Resolver<ResolversTypes['Aspect'], ParentType, ContextType>;
  calloutID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutMessageReceivedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutMessageReceived'] = ResolversParentTypes['CalloutMessageReceived']
> = {
  calloutID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentsID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CanvasResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Canvas'] = ResolversParentTypes['Canvas']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  checkout?: Resolver<
    Maybe<ResolversTypes['CanvasCheckout']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  preview?: Resolver<Maybe<ResolversTypes['Visual']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CanvasCheckoutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CanvasCheckout'] = ResolversParentTypes['CanvasCheckout']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  lockedBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['CanvasCheckoutStateEnum'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CanvasContentUpdatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CanvasContentUpdated'] = ResolversParentTypes['CanvasContentUpdated']
> = {
  canvasID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CanvasTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CanvasTemplate'] = ResolversParentTypes['CanvasTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['TemplateInfo'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChallengeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']
> = {
  activity?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  agent?: Resolver<Maybe<ResolversTypes['Agent']>, ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  challenges?: Resolver<
    Maybe<Array<ResolversTypes['Challenge']>>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    Maybe<ResolversTypes['Collaboration']>,
    ParentType,
    ContextType
  >;
  community?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType
  >;
  context?: Resolver<Maybe<ResolversTypes['Context']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hubID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<
    Maybe<ResolversTypes['Lifecycle']>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  opportunities?: Resolver<
    Maybe<Array<ResolversTypes['Opportunity']>>,
    ParentType,
    ContextType,
    Partial<ChallengeOpportunitiesArgs>
  >;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChallengeTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChallengeTemplate'] = ResolversParentTypes['ChallengeTemplate']
> = {
  applications?: Resolver<
    Maybe<Array<ResolversTypes['ApplicationTemplate']>>,
    ParentType,
    ContextType
  >;
  feedback?: Resolver<
    Maybe<Array<ResolversTypes['FeedbackTemplate']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Collaboration'] = ResolversParentTypes['Collaboration']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  callouts?: Resolver<
    Maybe<Array<ResolversTypes['Callout']>>,
    ParentType,
    ContextType,
    Partial<CollaborationCalloutsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  relations?: Resolver<
    Maybe<Array<ResolversTypes['Relation']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comments'] = ResolversParentTypes['Comments']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes['Message']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Communication'] = ResolversParentTypes['Communication']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  discussion?: Resolver<
    Maybe<ResolversTypes['Discussion']>,
    ParentType,
    ContextType,
    RequireFields<CommunicationDiscussionArgs, 'ID'>
  >;
  discussions?: Resolver<
    Maybe<Array<ResolversTypes['Discussion']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updates?: Resolver<Maybe<ResolversTypes['Updates']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminMembershipResult'] = ResolversParentTypes['CommunicationAdminMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomMembershipResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminOrphanedUsageResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminOrphanedUsageResult'] = ResolversParentTypes['CommunicationAdminOrphanedUsageResult']
> = {
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomMembershipResult'] = ResolversParentTypes['CommunicationAdminRoomMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extraMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinRule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  missingMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  roomID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomResult'] = ResolversParentTypes['CommunicationAdminRoomResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationDiscussionMessageReceivedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationDiscussionMessageReceived'] = ResolversParentTypes['CommunicationDiscussionMessageReceived']
> = {
  discussionID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationRoom'] = ResolversParentTypes['CommunicationRoom']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationUpdateMessageReceivedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationUpdateMessageReceived'] = ResolversParentTypes['CommunicationUpdateMessageReceived']
> = {
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  updatesID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']
> = {
  applications?: Resolver<
    Maybe<Array<ResolversTypes['Application']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  availableLeadUsers?: Resolver<
    Maybe<ResolversTypes['PaginatedUsers']>,
    ParentType,
    ContextType,
    Partial<CommunityAvailableLeadUsersArgs>
  >;
  availableMemberUsers?: Resolver<
    Maybe<ResolversTypes['PaginatedUsers']>,
    ParentType,
    ContextType,
    Partial<CommunityAvailableMemberUsersArgs>
  >;
  communication?: Resolver<
    Maybe<ResolversTypes['Communication']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<
    Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  leadOrganizations?: Resolver<
    Maybe<Array<ResolversTypes['Organization']>>,
    ParentType,
    ContextType
  >;
  leadUsers?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  memberOrganizations?: Resolver<
    Maybe<Array<ResolversTypes['Organization']>>,
    ParentType,
    ContextType
  >;
  memberUsers?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  policy?: Resolver<
    Maybe<ResolversTypes['CommunityPolicy']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityPolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityPolicy'] = ResolversParentTypes['CommunityPolicy']
> = {
  lead?: Resolver<
    ResolversTypes['CommunityPolicyRole'],
    ParentType,
    ContextType
  >;
  member?: Resolver<
    ResolversTypes['CommunityPolicyRole'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityPolicyRoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityPolicyRole'] = ResolversParentTypes['CommunityPolicyRole']
> = {
  credential?: Resolver<
    ResolversTypes['CredentialDefinition'],
    ParentType,
    ContextType
  >;
  maxOrg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxUser?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minOrg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minUser?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Config'] = ResolversParentTypes['Config']
> = {
  authentication?: Resolver<
    ResolversTypes['AuthenticationConfig'],
    ParentType,
    ContextType
  >;
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  sentry?: Resolver<ResolversTypes['Sentry'], ParentType, ContextType>;
  template?: Resolver<ResolversTypes['Template'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContextResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Context'] = ResolversParentTypes['Context']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  background?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  ecosystemModel?: Resolver<
    Maybe<ResolversTypes['EcosystemModel']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  impact?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType>;
  location?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    Maybe<Array<ResolversTypes['Reference']>>,
    ParentType,
    ContextType
  >;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vision?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType>;
  visuals?: Resolver<
    Maybe<Array<ResolversTypes['Visual']>>,
    ParentType,
    ContextType
  >;
  who?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorRolesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContributorRoles'] = ResolversParentTypes['ContributorRoles']
> = {
  applications?: Resolver<
    Maybe<Array<ResolversTypes['ApplicationForRoleResult']>>,
    ParentType,
    ContextType
  >;
  hubs?: Resolver<
    Array<ResolversTypes['RolesResultHub']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organizations?: Resolver<
    Array<ResolversTypes['RolesResultOrganization']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['AuthorizationCredential'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CredentialDefinition'] = ResolversParentTypes['CredentialDefinition']
> = {
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialMetadataOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CredentialMetadataOutput'] = ResolversParentTypes['CredentialMetadataOutput']
> = {
  context?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DirectRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DirectRoom'] = ResolversParentTypes['DirectRoom']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  receiverID?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Discussion'] = ResolversParentTypes['Discussion']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  category?: Resolver<
    ResolversTypes['DiscussionCategory'],
    ParentType,
    ContextType
  >;
  commentsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes['Message']>>,
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EcosystemModelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EcosystemModel'] = ResolversParentTypes['EcosystemModel']
> = {
  actorGroups?: Resolver<
    Maybe<Array<ResolversTypes['ActorGroup']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FeatureFlag'] = ResolversParentTypes['FeatureFlag']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FeedbackTemplate'] = ResolversParentTypes['FeedbackTemplate']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['QuestionTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Groupable'] = ResolversParentTypes['Groupable']
> = {
  __resolveType: TypeResolveFn<
    'Community' | 'Organization',
    ParentType,
    ContextType
  >;
  groups?: Resolver<
    Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
};

export type HubResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Hub'] = ResolversParentTypes['Hub']
> = {
  activity?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  agent?: Resolver<Maybe<ResolversTypes['Agent']>, ParentType, ContextType>;
  application?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<HubApplicationArgs, 'ID'>
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  challenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<HubChallengeArgs, 'ID'>
  >;
  challenges?: Resolver<
    Maybe<Array<ResolversTypes['Challenge']>>,
    ParentType,
    ContextType,
    Partial<HubChallengesArgs>
  >;
  collaboration?: Resolver<
    Maybe<ResolversTypes['Collaboration']>,
    ParentType,
    ContextType
  >;
  community?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    Partial<HubCommunityArgs>
  >;
  context?: Resolver<Maybe<ResolversTypes['Context']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<HubGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    Array<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType
  >;
  groupsWithTag?: Resolver<
    Array<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType,
    RequireFields<HubGroupsWithTagArgs, 'tag'>
  >;
  host?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  opportunities?: Resolver<
    Maybe<Array<ResolversTypes['Opportunity']>>,
    ParentType,
    ContextType
  >;
  opportunity?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<HubOpportunityArgs, 'ID'>
  >;
  preferences?: Resolver<
    Maybe<Array<ResolversTypes['Preference']>>,
    ParentType,
    ContextType
  >;
  project?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<HubProjectArgs, 'ID'>
  >;
  projects?: Resolver<
    Array<ResolversTypes['Project']>,
    ParentType,
    ContextType
  >;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  templates?: Resolver<
    Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType
  >;
  visibility?: Resolver<
    ResolversTypes['HubVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HubAspectTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['HubAspectTemplate'] = ResolversParentTypes['HubAspectTemplate']
> = {
  defaultDescription?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typeDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LifecycleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Lifecycle'] = ResolversParentTypes['Lifecycle']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  machineDef?: Resolver<
    ResolversTypes['LifecycleDefinition'],
    ParentType,
    ContextType
  >;
  nextEvents?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stateIsFinal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  templateName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LifecycleDefinitionScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['LifecycleDefinition'], any> {
  name: 'LifecycleDefinition';
}

export type LifecycleTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LifecycleTemplate'] = ResolversParentTypes['LifecycleTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  definition?: Resolver<
    ResolversTypes['LifecycleDefinition'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['TemplateInfo'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LifecycleType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MarkdownScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Markdown'], any> {
  name: 'Markdown';
}

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = {
  id?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MessageIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['MessageID'], any> {
  name: 'MessageID';
}

export type MetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']
> = {
  activity?: Resolver<Array<ResolversTypes['NVP']>, ParentType, ContextType>;
  services?: Resolver<
    Array<ResolversTypes['ServiceMetadata']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  adminCommunicationEnsureAccessToCommunications?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationEnsureAccessToCommunicationsArgs,
      'communicationData'
    >
  >;
  adminCommunicationRemoveOrphanedRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationRemoveOrphanedRoomArgs,
      'orphanedRoomData'
    >
  >;
  adminCommunicationUpdateRoomsJoinRule?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationUpdateRoomsJoinRuleArgs,
      'changeRoomAccessData'
    >
  >;
  applyForCommunityMembership?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationApplyForCommunityMembershipArgs, 'applicationData'>
  >;
  assignOrganizationAsCommunityLead?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAssignOrganizationAsCommunityLeadArgs,
      'leadershipData'
    >
  >;
  assignOrganizationAsCommunityMember?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAssignOrganizationAsCommunityMemberArgs,
      'membershipData'
    >
  >;
  assignUserAsChallengeAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsChallengeAdminArgs, 'membershipData'>
  >;
  assignUserAsCommunityLead?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsCommunityLeadArgs, 'leadershipData'>
  >;
  assignUserAsCommunityMember?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsCommunityMemberArgs, 'membershipData'>
  >;
  assignUserAsGlobalAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsGlobalAdminArgs, 'membershipData'>
  >;
  assignUserAsGlobalCommunityAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAssignUserAsGlobalCommunityAdminArgs,
      'membershipData'
    >
  >;
  assignUserAsGlobalHubsAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsGlobalHubsAdminArgs, 'membershipData'>
  >;
  assignUserAsHubAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsHubAdminArgs, 'membershipData'>
  >;
  assignUserAsOpportunityAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsOpportunityAdminArgs, 'membershipData'>
  >;
  assignUserAsOrganizationAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsOrganizationAdminArgs, 'membershipData'>
  >;
  assignUserAsOrganizationOwner?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserAsOrganizationOwnerArgs, 'membershipData'>
  >;
  assignUserToGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserToGroupArgs, 'membershipData'>
  >;
  assignUserToOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserToOrganizationArgs, 'membershipData'>
  >;
  authorizationPolicyResetOnHub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnHubArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnOrganizationArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnUserArgs,
      'authorizationResetData'
    >
  >;
  beginAlkemioUserVerifiedCredentialOfferInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialOfferOutput'],
    ParentType,
    ContextType
  >;
  beginCommunityMemberVerifiedCredentialOfferInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialOfferOutput'],
    ParentType,
    ContextType,
    RequireFields<
      MutationBeginCommunityMemberVerifiedCredentialOfferInteractionArgs,
      'communityID'
    >
  >;
  beginVerifiedCredentialRequestInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialRequestOutput'],
    ParentType,
    ContextType,
    RequireFields<
      MutationBeginVerifiedCredentialRequestInteractionArgs,
      'types'
    >
  >;
  convertChallengeToHub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<MutationConvertChallengeToHubArgs, 'convertData'>
  >;
  convertOpportunityToChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationConvertOpportunityToChallengeArgs, 'convertData'>
  >;
  createActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActorArgs, 'actorData'>
  >;
  createActorGroup?: Resolver<
    ResolversTypes['ActorGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActorGroupArgs, 'actorGroupData'>
  >;
  createAspectOnCallout?: Resolver<
    ResolversTypes['Aspect'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAspectOnCalloutArgs, 'aspectData'>
  >;
  createAspectTemplate?: Resolver<
    ResolversTypes['AspectTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAspectTemplateArgs, 'aspectTemplateInput'>
  >;
  createCalloutOnCollaboration?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCalloutOnCollaborationArgs, 'calloutData'>
  >;
  createCanvasOnCallout?: Resolver<
    ResolversTypes['Canvas'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCanvasOnCalloutArgs, 'canvasData'>
  >;
  createCanvasTemplate?: Resolver<
    ResolversTypes['CanvasTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCanvasTemplateArgs, 'canvasTemplateInput'>
  >;
  createChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChallengeArgs, 'challengeData'>
  >;
  createChildChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChildChallengeArgs, 'challengeData'>
  >;
  createDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateDiscussionArgs, 'createData'>
  >;
  createFeedbackOnCommunityContext?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateFeedbackOnCommunityContextArgs, 'feedbackData'>
  >;
  createGroupOnCommunity?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupOnCommunityArgs, 'groupData'>
  >;
  createGroupOnOrganization?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupOnOrganizationArgs, 'groupData'>
  >;
  createHub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateHubArgs, 'hubData'>
  >;
  createLifecycleTemplate?: Resolver<
    ResolversTypes['LifecycleTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLifecycleTemplateArgs, 'lifecycleTemplateInput'>
  >;
  createOpportunity?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateOpportunityArgs, 'opportunityData'>
  >;
  createOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrganizationArgs, 'organizationData'>
  >;
  createProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, 'projectData'>
  >;
  createReferenceOnAspect?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReferenceOnAspectArgs, 'referenceData'>
  >;
  createReferenceOnContext?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReferenceOnContextArgs, 'referenceInput'>
  >;
  createReferenceOnProfile?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReferenceOnProfileArgs, 'referenceInput'>
  >;
  createRelationOnCollaboration?: Resolver<
    ResolversTypes['Relation'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRelationOnCollaborationArgs, 'relationData'>
  >;
  createTagsetOnProfile?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTagsetOnProfileArgs, 'tagsetData'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'userData'>
  >;
  createUserNewRegistration?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType
  >;
  deleteActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteActorArgs, 'deleteData'>
  >;
  deleteActorGroup?: Resolver<
    ResolversTypes['ActorGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteActorGroupArgs, 'deleteData'>
  >;
  deleteAspect?: Resolver<
    ResolversTypes['Aspect'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAspectArgs, 'deleteData'>
  >;
  deleteAspectTemplate?: Resolver<
    ResolversTypes['AspectTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAspectTemplateArgs, 'deleteData'>
  >;
  deleteCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCalloutArgs, 'deleteData'>
  >;
  deleteCanvas?: Resolver<
    ResolversTypes['Canvas'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCanvasArgs, 'canvasData'>
  >;
  deleteCanvasTemplate?: Resolver<
    ResolversTypes['CanvasTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCanvasTemplateArgs, 'deleteData'>
  >;
  deleteChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteChallengeArgs, 'deleteData'>
  >;
  deleteCollaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCollaborationArgs, 'deleteData'>
  >;
  deleteDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDiscussionArgs, 'deleteData'>
  >;
  deleteHub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteHubArgs, 'deleteData'>
  >;
  deleteLifecycleTemplate?: Resolver<
    ResolversTypes['LifecycleTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLifecycleTemplateArgs, 'deleteData'>
  >;
  deleteOpportunity?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOpportunityArgs, 'deleteData'>
  >;
  deleteOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOrganizationArgs, 'deleteData'>
  >;
  deleteProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectArgs, 'deleteData'>
  >;
  deleteReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReferenceArgs, 'deleteData'>
  >;
  deleteRelation?: Resolver<
    ResolversTypes['Relation'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRelationArgs, 'deleteData'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'deleteData'>
  >;
  deleteUserApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserApplicationArgs, 'deleteData'>
  >;
  deleteUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserGroupArgs, 'deleteData'>
  >;
  eventOnApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnApplicationArgs, 'applicationEventData'>
  >;
  eventOnCanvasCheckout?: Resolver<
    ResolversTypes['CanvasCheckout'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnCanvasCheckoutArgs, 'canvasCheckoutEventData'>
  >;
  eventOnChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnChallengeArgs, 'challengeEventData'>
  >;
  eventOnOpportunity?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnOpportunityArgs, 'opportunityEventData'>
  >;
  eventOnOrganizationVerification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType,
    RequireFields<
      MutationEventOnOrganizationVerificationArgs,
      'organizationVerificationEventData'
    >
  >;
  eventOnProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnProjectArgs, 'projectEventData'>
  >;
  grantCredentialToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationGrantCredentialToUserArgs, 'grantCredentialData'>
  >;
  joinCommunity?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationJoinCommunityArgs, 'joinCommunityData'>
  >;
  messageUser?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationMessageUserArgs, 'messageData'>
  >;
  removeComment?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommentArgs, 'messageData'>
  >;
  removeMessageFromDiscussion?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMessageFromDiscussionArgs, 'messageData'>
  >;
  removeOrganizationAsCommunityLead?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveOrganizationAsCommunityLeadArgs,
      'leadershipData'
    >
  >;
  removeOrganizationAsCommunityMember?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveOrganizationAsCommunityMemberArgs,
      'membershipData'
    >
  >;
  removeUpdate?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUpdateArgs, 'messageData'>
  >;
  removeUserAsChallengeAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsChallengeAdminArgs, 'membershipData'>
  >;
  removeUserAsCommunityLead?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsCommunityLeadArgs, 'leadershipData'>
  >;
  removeUserAsCommunityMember?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsCommunityMemberArgs, 'membershipData'>
  >;
  removeUserAsGlobalAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsGlobalAdminArgs, 'membershipData'>
  >;
  removeUserAsGlobalCommunityAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveUserAsGlobalCommunityAdminArgs,
      'membershipData'
    >
  >;
  removeUserAsGlobalHubsAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsGlobalHubsAdminArgs, 'membershipData'>
  >;
  removeUserAsHubAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsHubAdminArgs, 'membershipData'>
  >;
  removeUserAsOpportunityAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsOpportunityAdminArgs, 'membershipData'>
  >;
  removeUserAsOrganizationAdmin?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsOrganizationAdminArgs, 'membershipData'>
  >;
  removeUserAsOrganizationOwner?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserAsOrganizationOwnerArgs, 'membershipData'>
  >;
  removeUserFromGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserFromGroupArgs, 'membershipData'>
  >;
  removeUserFromOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserFromOrganizationArgs, 'membershipData'>
  >;
  revokeCredentialFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeCredentialFromUserArgs, 'revokeCredentialData'>
  >;
  sendComment?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendCommentArgs, 'messageData'>
  >;
  sendMessageOnCallout?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageOnCalloutArgs, 'data'>
  >;
  sendMessageToDiscussion?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageToDiscussionArgs, 'messageData'>
  >;
  sendUpdate?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendUpdateArgs, 'messageData'>
  >;
  updateActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateActorArgs, 'actorData'>
  >;
  updateAspect?: Resolver<
    ResolversTypes['Aspect'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAspectArgs, 'aspectData'>
  >;
  updateAspectTemplate?: Resolver<
    ResolversTypes['AspectTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAspectTemplateArgs, 'aspectTemplateInput'>
  >;
  updateCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutArgs, 'calloutData'>
  >;
  updateCalloutVisibility?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutVisibilityArgs, 'calloutData'>
  >;
  updateCanvas?: Resolver<
    ResolversTypes['Canvas'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCanvasArgs, 'canvasData'>
  >;
  updateCanvasTemplate?: Resolver<
    ResolversTypes['CanvasTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCanvasTemplateArgs, 'canvasTemplateInput'>
  >;
  updateChallenge?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChallengeArgs, 'challengeData'>
  >;
  updateChallengeInnovationFlow?: Resolver<
    ResolversTypes['Challenge'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChallengeInnovationFlowArgs, 'challengeData'>
  >;
  updateDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDiscussionArgs, 'updateData'>
  >;
  updateEcosystemModel?: Resolver<
    ResolversTypes['EcosystemModel'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEcosystemModelArgs, 'ecosystemModelData'>
  >;
  updateHub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHubArgs, 'hubData'>
  >;
  updateHubVisibility?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHubVisibilityArgs, 'visibilityData'>
  >;
  updateLifecycleTemplate?: Resolver<
    ResolversTypes['LifecycleTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLifecycleTemplateArgs, 'lifecycleTemplateInput'>
  >;
  updateOpportunity?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOpportunityArgs, 'opportunityData'>
  >;
  updateOpportunityInnovationFlow?: Resolver<
    ResolversTypes['Opportunity'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateOpportunityInnovationFlowArgs,
      'opportunityData'
    >
  >;
  updateOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrganizationArgs, 'organizationData'>
  >;
  updatePreferenceOnChallenge?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnChallengeArgs, 'preferenceData'>
  >;
  updatePreferenceOnHub?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnHubArgs, 'preferenceData'>
  >;
  updatePreferenceOnOrganization?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnOrganizationArgs, 'preferenceData'>
  >;
  updatePreferenceOnUser?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnUserArgs, 'preferenceData'>
  >;
  updateProfile?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileArgs, 'profileData'>
  >;
  updateProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, 'projectData'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'userData'>
  >;
  updateUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserGroupArgs, 'userGroupData'>
  >;
  updateVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVisualArgs, 'updateData'>
  >;
  uploadImageOnVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadImageOnVisualArgs, 'file' | 'uploadData'>
  >;
};

export type NvpResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NVP'] = ResolversParentTypes['NVP']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface NameIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NameID'], any> {
  name: 'NameID';
}

export type OpportunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Opportunity'] = ResolversParentTypes['Opportunity']
> = {
  activity?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  challenge?: Resolver<
    Maybe<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    Maybe<ResolversTypes['Collaboration']>,
    ParentType,
    ContextType
  >;
  community?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType
  >;
  context?: Resolver<Maybe<ResolversTypes['Context']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<
    Maybe<ResolversTypes['Lifecycle']>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentNameID?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Maybe<Array<ResolversTypes['Project']>>,
    ParentType,
    ContextType
  >;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpportunityTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OpportunityTemplate'] = ResolversParentTypes['OpportunityTemplate']
> = {
  actorGroups?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  applications?: Resolver<
    Maybe<Array<ResolversTypes['ApplicationTemplate']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relations?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
  activity?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  agent?: Resolver<Maybe<ResolversTypes['Agent']>, ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contactEmail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  group?: Resolver<
    Maybe<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType,
    RequireFields<OrganizationGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  legalEntityName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  members?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  verification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType
  >;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationTemplate'] = ResolversParentTypes['OrganizationTemplate']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagsets?: Resolver<
    Maybe<Array<ResolversTypes['TagsetTemplate']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationVerificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationVerification'] = ResolversParentTypes['OrganizationVerification']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['OrganizationVerificationEnum'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OryConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OryConfig'] = ResolversParentTypes['OryConfig']
> = {
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kratosPublicBaseURL?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedOrganization'] = ResolversParentTypes['PaginatedOrganization']
> = {
  organization?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedUsersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedUsers'] = ResolversParentTypes['PaginatedUsers']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']
> = {
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<
    Array<ResolversTypes['FeatureFlag']>,
    ParentType,
    ContextType
  >;
  feedback?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  foundation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  impact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opensource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releases?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  security?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  support?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terms?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformHubTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformHubTemplate'] = ResolversParentTypes['PlatformHubTemplate']
> = {
  applications?: Resolver<
    Maybe<Array<ResolversTypes['ApplicationTemplate']>>,
    ParentType,
    ContextType
  >;
  aspects?: Resolver<
    Maybe<Array<ResolversTypes['HubAspectTemplate']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Preference'] = ResolversParentTypes['Preference']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  definition?: Resolver<
    ResolversTypes['PreferenceDefinition'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PreferenceDefinition'] = ResolversParentTypes['PreferenceDefinition']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PreferenceType'], ParentType, ContextType>;
  valueType?: Resolver<
    ResolversTypes['PreferenceValueType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  avatar?: Resolver<Maybe<ResolversTypes['Visual']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  location?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    Maybe<Array<ResolversTypes['Reference']>>,
    ParentType,
    ContextType
  >;
  tagsets?: Resolver<
    Maybe<Array<ResolversTypes['Tagset']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileCredentialVerifiedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProfileCredentialVerified'] = ResolversParentTypes['ProfileCredentialVerified']
> = {
  userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<
    Maybe<ResolversTypes['Lifecycle']>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  activityLogOnCollaboration?: Resolver<
    Array<ResolversTypes['Activity']>,
    ParentType,
    ContextType,
    RequireFields<QueryActivityLogOnCollaborationArgs, 'queryData'>
  >;
  adminCommunicationMembership?: Resolver<
    ResolversTypes['CommunicationAdminMembershipResult'],
    ParentType,
    ContextType,
    RequireFields<QueryAdminCommunicationMembershipArgs, 'communicationData'>
  >;
  adminCommunicationOrphanedUsage?: Resolver<
    ResolversTypes['CommunicationAdminOrphanedUsageResult'],
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    ResolversTypes['Authorization'],
    ParentType,
    ContextType
  >;
  configuration?: Resolver<ResolversTypes['Config'], ParentType, ContextType>;
  getSupportedVerifiedCredentialMetadata?: Resolver<
    Array<ResolversTypes['CredentialMetadataOutput']>,
    ParentType,
    ContextType
  >;
  hub?: Resolver<
    ResolversTypes['Hub'],
    ParentType,
    ContextType,
    RequireFields<QueryHubArgs, 'ID'>
  >;
  hubs?: Resolver<
    Array<ResolversTypes['Hub']>,
    ParentType,
    ContextType,
    Partial<QueryHubsArgs>
  >;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  meHasProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationArgs, 'ID'>
  >;
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    Partial<QueryOrganizationsArgs>
  >;
  organizationsPaginated?: Resolver<
    ResolversTypes['PaginatedOrganization'],
    ParentType,
    ContextType,
    Partial<QueryOrganizationsPaginatedArgs>
  >;
  rolesOrganization?: Resolver<
    ResolversTypes['ContributorRoles'],
    ParentType,
    ContextType,
    RequireFields<QueryRolesOrganizationArgs, 'rolesData'>
  >;
  rolesUser?: Resolver<
    ResolversTypes['ContributorRoles'],
    ParentType,
    ContextType,
    RequireFields<QueryRolesUserArgs, 'rolesData'>
  >;
  search?: Resolver<
    Array<ResolversTypes['SearchResultEntry']>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, 'searchData'>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'ID'>
  >;
  userAuthorizationPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryUserAuthorizationPrivilegesArgs,
      'userAuthorizationPrivilegesData'
    >
  >;
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<QueryUsersArgs>
  >;
  usersById?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersByIdArgs, 'IDs'>
  >;
  usersPaginated?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<QueryUsersPaginatedArgs>
  >;
  usersWithAuthorizationCredential?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryUsersWithAuthorizationCredentialArgs,
      'credentialsCriteriaData'
    >
  >;
};

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuestionTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['QuestionTemplate'] = ResolversParentTypes['QuestionTemplate']
> = {
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Reference'] = ResolversParentTypes['Reference']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']
> = {
  actorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actorRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actorType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedUser'] = ResolversParentTypes['RelayPaginatedUser']
> = {
  accountUpn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  agent?: Resolver<Maybe<ResolversTypes['Agent']>, ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communityRooms?: Resolver<
    Maybe<Array<ResolversTypes['CommunicationRoom']>>,
    ParentType,
    ContextType
  >;
  directRooms?: Resolver<
    Maybe<Array<ResolversTypes['DirectRoom']>>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedUserEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedUserEdge'] = ResolversParentTypes['RelayPaginatedUserEdge']
> = {
  node?: Resolver<
    ResolversTypes['RelayPaginatedUser'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedUserPageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedUserPageInfo'] = ResolversParentTypes['RelayPaginatedUserPageInfo']
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResult'] = ResolversParentTypes['RolesResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultCommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultCommunity'] = ResolversParentTypes['RolesResultCommunity']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  userGroups?: Resolver<
    Array<ResolversTypes['RolesResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultHubResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultHub'] = ResolversParentTypes['RolesResultHub']
> = {
  challenges?: Resolver<
    Array<ResolversTypes['RolesResultCommunity']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hubID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  opportunities?: Resolver<
    Array<ResolversTypes['RolesResultCommunity']>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  userGroups?: Resolver<
    Array<ResolversTypes['RolesResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultOrganization'] = ResolversParentTypes['RolesResultOrganization']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  organizationID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  userGroups?: Resolver<
    Array<ResolversTypes['RolesResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultEntry'] = ResolversParentTypes['SearchResultEntry']
> = {
  result?: Resolver<
    Maybe<ResolversTypes['Searchable']>,
    ParentType,
    ContextType
  >;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  terms?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Searchable'] = ResolversParentTypes['Searchable']
> = {
  __resolveType: TypeResolveFn<
    | 'Challenge'
    | 'Hub'
    | 'Opportunity'
    | 'Organization'
    | 'RelayPaginatedUser'
    | 'User'
    | 'UserGroup',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
};

export type SentryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Sentry'] = ResolversParentTypes['Sentry']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submitPII?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceMetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ServiceMetadata'] = ResolversParentTypes['ServiceMetadata']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  aspectCommentsMessageReceived?: SubscriptionResolver<
    ResolversTypes['AspectCommentsMessageReceived'],
    'aspectCommentsMessageReceived',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAspectCommentsMessageReceivedArgs, 'aspectID'>
  >;
  calloutAspectCreated?: SubscriptionResolver<
    ResolversTypes['CalloutAspectCreated'],
    'calloutAspectCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCalloutAspectCreatedArgs, 'calloutID'>
  >;
  calloutMessageReceived?: SubscriptionResolver<
    ResolversTypes['CalloutMessageReceived'],
    'calloutMessageReceived',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCalloutMessageReceivedArgs, 'calloutIDs'>
  >;
  canvasContentUpdated?: SubscriptionResolver<
    ResolversTypes['CanvasContentUpdated'],
    'canvasContentUpdated',
    ParentType,
    ContextType,
    Partial<SubscriptionCanvasContentUpdatedArgs>
  >;
  communicationDiscussionMessageReceived?: SubscriptionResolver<
    ResolversTypes['CommunicationDiscussionMessageReceived'],
    'communicationDiscussionMessageReceived',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionCommunicationDiscussionMessageReceivedArgs,
      'discussionID'
    >
  >;
  communicationDiscussionUpdated?: SubscriptionResolver<
    ResolversTypes['Discussion'],
    'communicationDiscussionUpdated',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionCommunicationDiscussionUpdatedArgs,
      'communicationID'
    >
  >;
  communicationUpdateMessageReceived?: SubscriptionResolver<
    ResolversTypes['CommunicationUpdateMessageReceived'],
    'communicationUpdateMessageReceived',
    ParentType,
    ContextType,
    Partial<SubscriptionCommunicationUpdateMessageReceivedArgs>
  >;
  profileVerifiedCredential?: SubscriptionResolver<
    ResolversTypes['ProfileCredentialVerified'],
    'profileVerifiedCredential',
    ParentType,
    ContextType
  >;
};

export type TagsetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tagset'] = ResolversParentTypes['Tagset']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsetTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsetTemplate'] = ResolversParentTypes['TagsetTemplate']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholder?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']
> = {
  challenges?: Resolver<
    Array<ResolversTypes['ChallengeTemplate']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hubs?: Resolver<
    Array<ResolversTypes['PlatformHubTemplate']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opportunities?: Resolver<
    Array<ResolversTypes['OpportunityTemplate']>,
    ParentType,
    ContextType
  >;
  organizations?: Resolver<
    Array<ResolversTypes['OrganizationTemplate']>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Array<ResolversTypes['UserTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplateInfo'] = ResolversParentTypes['TemplateInfo']
> = {
  description?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  tagset?: Resolver<Maybe<ResolversTypes['Tagset']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visual?: Resolver<Maybe<ResolversTypes['Visual']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplatesSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplatesSet'] = ResolversParentTypes['TemplatesSet']
> = {
  aspectTemplate?: Resolver<
    Maybe<ResolversTypes['AspectTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetAspectTemplateArgs, 'ID'>
  >;
  aspectTemplates?: Resolver<
    Array<ResolversTypes['AspectTemplate']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  canvasTemplate?: Resolver<
    Maybe<ResolversTypes['CanvasTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetCanvasTemplateArgs, 'ID'>
  >;
  canvasTemplates?: Resolver<
    Array<ResolversTypes['CanvasTemplate']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycleTemplate?: Resolver<
    Maybe<ResolversTypes['LifecycleTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetLifecycleTemplateArgs, 'ID'>
  >;
  lifecycleTemplates?: Resolver<
    Array<ResolversTypes['LifecycleTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface Uuid_NameidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID_NAMEID'], any> {
  name: 'UUID_NAMEID';
}

export interface Uuid_Nameid_EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID_NAMEID_EMAIL'], any> {
  name: 'UUID_NAMEID_EMAIL';
}

export type UpdatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Updates'] = ResolversParentTypes['Updates']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes['Message']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  accountUpn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  agent?: Resolver<Maybe<ResolversTypes['Agent']>, ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communityRooms?: Resolver<
    Maybe<Array<ResolversTypes['CommunicationRoom']>>,
    ParentType,
    ContextType
  >;
  directRooms?: Resolver<
    Maybe<Array<ResolversTypes['DirectRoom']>>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserGroup'] = ResolversParentTypes['UserGroup']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<
    Maybe<ResolversTypes['Groupable']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserTemplate'] = ResolversParentTypes['UserTemplate']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagsets?: Resolver<
    Maybe<Array<ResolversTypes['TagsetTemplate']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifiedCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifiedCredential'] = ResolversParentTypes['VerifiedCredential']
> = {
  claims?: Resolver<
    Array<ResolversTypes['VerifiedCredentialClaim']>,
    ParentType,
    ContextType
  >;
  context?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issued?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifiedCredentialClaimResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifiedCredentialClaim'] = ResolversParentTypes['VerifiedCredentialClaim']
> = {
  name?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisualResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Visual'] = ResolversParentTypes['Visual']
> = {
  allowedTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  maxHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Activity?: ActivityResolvers<ContextType>;
  Actor?: ActorResolvers<ContextType>;
  ActorGroup?: ActorGroupResolvers<ContextType>;
  Agent?: AgentResolvers<ContextType>;
  AgentBeginVerifiedCredentialOfferOutput?: AgentBeginVerifiedCredentialOfferOutputResolvers<ContextType>;
  AgentBeginVerifiedCredentialRequestOutput?: AgentBeginVerifiedCredentialRequestOutputResolvers<ContextType>;
  Application?: ApplicationResolvers<ContextType>;
  ApplicationForRoleResult?: ApplicationForRoleResultResolvers<ContextType>;
  ApplicationTemplate?: ApplicationTemplateResolvers<ContextType>;
  Aspect?: AspectResolvers<ContextType>;
  AspectCommentsMessageReceived?: AspectCommentsMessageReceivedResolvers<ContextType>;
  AspectTemplate?: AspectTemplateResolvers<ContextType>;
  AuthenticationConfig?: AuthenticationConfigResolvers<ContextType>;
  AuthenticationProviderConfig?: AuthenticationProviderConfigResolvers<ContextType>;
  AuthenticationProviderConfigUnion?: AuthenticationProviderConfigUnionResolvers<ContextType>;
  Authorization?: AuthorizationResolvers<ContextType>;
  AuthorizationPolicyRuleCredential?: AuthorizationPolicyRuleCredentialResolvers<ContextType>;
  AuthorizationPolicyRulePrivilege?: AuthorizationPolicyRulePrivilegeResolvers<ContextType>;
  AuthorizationPolicyRuleVerifiedCredential?: AuthorizationPolicyRuleVerifiedCredentialResolvers<ContextType>;
  Callout?: CalloutResolvers<ContextType>;
  CalloutAspectCreated?: CalloutAspectCreatedResolvers<ContextType>;
  CalloutMessageReceived?: CalloutMessageReceivedResolvers<ContextType>;
  Canvas?: CanvasResolvers<ContextType>;
  CanvasCheckout?: CanvasCheckoutResolvers<ContextType>;
  CanvasContentUpdated?: CanvasContentUpdatedResolvers<ContextType>;
  CanvasTemplate?: CanvasTemplateResolvers<ContextType>;
  Challenge?: ChallengeResolvers<ContextType>;
  ChallengeTemplate?: ChallengeTemplateResolvers<ContextType>;
  Collaboration?: CollaborationResolvers<ContextType>;
  Comments?: CommentsResolvers<ContextType>;
  Communication?: CommunicationResolvers<ContextType>;
  CommunicationAdminMembershipResult?: CommunicationAdminMembershipResultResolvers<ContextType>;
  CommunicationAdminOrphanedUsageResult?: CommunicationAdminOrphanedUsageResultResolvers<ContextType>;
  CommunicationAdminRoomMembershipResult?: CommunicationAdminRoomMembershipResultResolvers<ContextType>;
  CommunicationAdminRoomResult?: CommunicationAdminRoomResultResolvers<ContextType>;
  CommunicationDiscussionMessageReceived?: CommunicationDiscussionMessageReceivedResolvers<ContextType>;
  CommunicationRoom?: CommunicationRoomResolvers<ContextType>;
  CommunicationUpdateMessageReceived?: CommunicationUpdateMessageReceivedResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CommunityPolicy?: CommunityPolicyResolvers<ContextType>;
  CommunityPolicyRole?: CommunityPolicyRoleResolvers<ContextType>;
  Config?: ConfigResolvers<ContextType>;
  Context?: ContextResolvers<ContextType>;
  ContributorRoles?: ContributorRolesResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  CredentialDefinition?: CredentialDefinitionResolvers<ContextType>;
  CredentialMetadataOutput?: CredentialMetadataOutputResolvers<ContextType>;
  DID?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DirectRoom?: DirectRoomResolvers<ContextType>;
  Discussion?: DiscussionResolvers<ContextType>;
  EcosystemModel?: EcosystemModelResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  FeedbackTemplate?: FeedbackTemplateResolvers<ContextType>;
  Groupable?: GroupableResolvers<ContextType>;
  Hub?: HubResolvers<ContextType>;
  HubAspectTemplate?: HubAspectTemplateResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Lifecycle?: LifecycleResolvers<ContextType>;
  LifecycleDefinition?: GraphQLScalarType;
  LifecycleTemplate?: LifecycleTemplateResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Markdown?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  MessageID?: GraphQLScalarType;
  Metadata?: MetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NVP?: NvpResolvers<ContextType>;
  NameID?: GraphQLScalarType;
  Opportunity?: OpportunityResolvers<ContextType>;
  OpportunityTemplate?: OpportunityTemplateResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationTemplate?: OrganizationTemplateResolvers<ContextType>;
  OrganizationVerification?: OrganizationVerificationResolvers<ContextType>;
  OryConfig?: OryConfigResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedOrganization?: PaginatedOrganizationResolvers<ContextType>;
  PaginatedUsers?: PaginatedUsersResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  PlatformHubTemplate?: PlatformHubTemplateResolvers<ContextType>;
  Preference?: PreferenceResolvers<ContextType>;
  PreferenceDefinition?: PreferenceDefinitionResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileCredentialVerified?: ProfileCredentialVerifiedResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  QuestionTemplate?: QuestionTemplateResolvers<ContextType>;
  Reference?: ReferenceResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  RelayPaginatedUser?: RelayPaginatedUserResolvers<ContextType>;
  RelayPaginatedUserEdge?: RelayPaginatedUserEdgeResolvers<ContextType>;
  RelayPaginatedUserPageInfo?: RelayPaginatedUserPageInfoResolvers<ContextType>;
  RolesResult?: RolesResultResolvers<ContextType>;
  RolesResultCommunity?: RolesResultCommunityResolvers<ContextType>;
  RolesResultHub?: RolesResultHubResolvers<ContextType>;
  RolesResultOrganization?: RolesResultOrganizationResolvers<ContextType>;
  SearchResultEntry?: SearchResultEntryResolvers<ContextType>;
  Searchable?: SearchableResolvers<ContextType>;
  Sentry?: SentryResolvers<ContextType>;
  ServiceMetadata?: ServiceMetadataResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tagset?: TagsetResolvers<ContextType>;
  TagsetTemplate?: TagsetTemplateResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateInfo?: TemplateInfoResolvers<ContextType>;
  TemplatesSet?: TemplatesSetResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  UUID_NAMEID?: GraphQLScalarType;
  UUID_NAMEID_EMAIL?: GraphQLScalarType;
  Updates?: UpdatesResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserGroup?: UserGroupResolvers<ContextType>;
  UserTemplate?: UserTemplateResolvers<ContextType>;
  VerifiedCredential?: VerifiedCredentialResolvers<ContextType>;
  VerifiedCredentialClaim?: VerifiedCredentialClaimResolvers<ContextType>;
  Visual?: VisualResolvers<ContextType>;
};

export type CreateCalloutOnCollaborationMutationVariables = Exact<{
  data: CreateCalloutOnCollaborationInput;
}>;

export type CreateCalloutOnCollaborationMutation = {
  createCalloutOnCollaboration: {
    id: string;
    nameID: string;
    type: CalloutType;
  };
};

export type UpdateCalloutVisibilityMutationVariables = Exact<{
  calloutData: UpdateCalloutVisibilityInput;
}>;

export type UpdateCalloutVisibilityMutation = {
  updateCalloutVisibility: { id: string };
};

export type UpdateCalloutMutationVariables = Exact<{
  calloutData: UpdateCalloutInput;
}>;

export type UpdateCalloutMutation = {
  updateCallout: { id: string; nameID: string };
};

export type UpdateCardMutationVariables = Exact<{
  cardData: UpdateAspectInput;
}>;

export type UpdateCardMutation = {
  updateAspect: { id: string; nameID: string; displayName: string };
};

export type ChallengeCalloutsQueryVariables = Exact<{
  hubID: Scalars['UUID_NAMEID'];
  challengeID: Scalars['UUID_NAMEID'];
}>;

export type ChallengeCalloutsQuery = {
  hub: {
    id: string;
    nameID: string;
    displayName: string;
    challenge: {
      id: string;
      nameID: string;
      collaboration?:
        | {
            id: string;
            callouts?:
              | Array<{
                  nameID: string;
                  id: string;
                  type: CalloutType;
                  aspects?: Array<{ id: string; nameID: string }> | undefined;
                }>
              | undefined;
          }
        | undefined;
    };
  };
};

export type HubCalloutsQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type HubCalloutsQuery = {
  hub: {
    id: string;
    nameID: string;
    displayName: string;
    collaboration?:
      | {
          id: string;
          callouts?:
            | Array<{
                nameID: string;
                id: string;
                type: CalloutType;
                aspects?: Array<{ id: string; nameID: string }> | undefined;
              }>
            | undefined;
        }
      | undefined;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    id: string;
    nameID: string;
    displayName: string;
    email: string;
    profile?:
      | {
          avatar?: { uri: string } | undefined;
          location?: { country: string; city: string } | undefined;
        }
      | undefined;
  };
};

export const CreateCalloutOnCollaborationDocument = gql`
  mutation createCalloutOnCollaboration(
    $data: CreateCalloutOnCollaborationInput!
  ) {
    createCalloutOnCollaboration(calloutData: $data) {
      id
      nameID
      type
    }
  }
`;
export const UpdateCalloutVisibilityDocument = gql`
  mutation updateCalloutVisibility(
    $calloutData: UpdateCalloutVisibilityInput!
  ) {
    updateCalloutVisibility(calloutData: $calloutData) {
      id
    }
  }
`;
export const UpdateCalloutDocument = gql`
  mutation updateCallout($calloutData: UpdateCalloutInput!) {
    updateCallout(calloutData: $calloutData) {
      id
      nameID
    }
  }
`;
export const UpdateCardDocument = gql`
  mutation updateCard($cardData: UpdateAspectInput!) {
    updateAspect(aspectData: $cardData) {
      id
      nameID
      displayName
    }
  }
`;
export const ChallengeCalloutsDocument = gql`
  query challengeCallouts($hubID: UUID_NAMEID!, $challengeID: UUID_NAMEID!) {
    hub(ID: $hubID) {
      id
      nameID
      displayName
      challenge(ID: $challengeID) {
        id
        nameID
        collaboration {
          id
          callouts {
            nameID
            id
            type
            aspects {
              id
              nameID
            }
          }
        }
      }
    }
  }
`;
export const HubCalloutsDocument = gql`
  query hubCallouts($id: UUID_NAMEID!) {
    hub(ID: $id) {
      id
      nameID
      displayName
      collaboration {
        id
        callouts {
          nameID
          id
          type
          aspects {
            id
            nameID
          }
        }
      }
    }
  }
`;
export const MeDocument = gql`
  query me {
    me {
      id
      nameID
      displayName
      profile {
        avatar {
          uri
        }
        location {
          country
          city
        }
      }
      email
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const CreateCalloutOnCollaborationDocumentString = print(
  CreateCalloutOnCollaborationDocument
);
const UpdateCalloutVisibilityDocumentString = print(
  UpdateCalloutVisibilityDocument
);
const UpdateCalloutDocumentString = print(UpdateCalloutDocument);
const UpdateCardDocumentString = print(UpdateCardDocument);
const ChallengeCalloutsDocumentString = print(ChallengeCalloutsDocument);
const HubCalloutsDocumentString = print(HubCalloutsDocument);
const MeDocumentString = print(MeDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    createCalloutOnCollaboration(
      variables: CreateCalloutOnCollaborationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: CreateCalloutOnCollaborationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<CreateCalloutOnCollaborationMutation>(
            CreateCalloutOnCollaborationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createCalloutOnCollaboration',
        'mutation'
      );
    },
    updateCalloutVisibility(
      variables: UpdateCalloutVisibilityMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCalloutVisibilityMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCalloutVisibilityMutation>(
            UpdateCalloutVisibilityDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCalloutVisibility',
        'mutation'
      );
    },
    updateCallout(
      variables: UpdateCalloutMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCalloutMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCalloutMutation>(
            UpdateCalloutDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCallout',
        'mutation'
      );
    },
    updateCard(
      variables: UpdateCardMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCardMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCardMutation>(
            UpdateCardDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCard',
        'mutation'
      );
    },
    challengeCallouts(
      variables: ChallengeCalloutsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: ChallengeCalloutsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<ChallengeCalloutsQuery>(
            ChallengeCalloutsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'challengeCallouts',
        'query'
      );
    },
    hubCallouts(
      variables: HubCalloutsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: HubCalloutsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<HubCalloutsQuery>(
            HubCalloutsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'hubCallouts',
        'query'
      );
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: MeQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'me',
        'query'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
