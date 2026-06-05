import teamData from "./team.json";

export type TeamMember = {
  name: string;
  picture: string;
  position: string;
  institution: string;
  profileLink?: string;
  bio?: string;
};

export const teamMembers = teamData satisfies TeamMember[];
