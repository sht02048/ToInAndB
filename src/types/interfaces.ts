interface MissileRouteCommand {
  PLAYER_STRAIGHT: string;
  ENEMY_STRAIGHT: string;
  ENEMY_AIMED: string;
  ENEMY_ALLWAY: string;
  GUIDED: string;
}

interface MissileInformation {
  x?: number;
  y?: number;
  projectilePath: string;
  missileWidth: number;
  missileSpeed: number;
  missileDamage?: number;
  isAimed?: boolean;
  shouldTilt?: boolean;
}

export { MissileRouteCommand, MissileInformation };
