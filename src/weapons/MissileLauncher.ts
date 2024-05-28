import Missile from "./Missile";

import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";
import { MissileInformation } from "../types/interfaces";

import Player from "../entities/Player";
import Enemy from "../entities/enemies/Enemy";
import SpaceShip from "../entities/Spaceship";

class MissileLauncher {
  private target: Player | Enemy;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private targetList: SpaceShip[];

  public missileList: Missile[];

  #multipleAngle = 0.1;
  #projectileNumber = 15;
  #enemyDamage = 1;

  constructor(width: number, height: number) {
    this.x;
    this.y;
    this.width = width;
    this.height = height;

    this.missileList = [];
  }

  public setTargetList(targetList: SpaceShip[]): void {
    this.targetList = targetList;
  }

  public makeMissile({
    projectilePath,
    x,
    y,
    missileWidth,
    missileDamage = this.#enemyDamage,
    missileSpeed,
    isAimed = false,
  }: MissileInformation): Missile {
    const missile = new Missile(projectilePath);
    this.x = x;
    this.y = y;

    const shipCenter = this.x + this.width / 2 - missileWidth / 2;

    missile.x = shipCenter;
    missile.y = y;
    missile.damage = missileDamage;
    missile.speed = missileSpeed;
    missile.width = missileWidth;

    if (isAimed) {
      const { vx, vy, angle, targetIndex } = this.#lockOn(missile);

      missile.vx = vx;
      missile.vy = vy;
      missile.angle = angle;
      missile.targetIndex = targetIndex;
    }

    return missile;
  }

  public loadSingleMissile(missileInformation: MissileInformation): void {
    const missile = this.makeMissile(missileInformation);

    this.missileList.push(missile);
  }

  public loadMultipleMissile(missileInformation: MissileInformation): void {
    const radiansPerProjectile = (Math.PI * 2) / this.#projectileNumber;

    for (let i = 0; i < this.#projectileNumber; i += 1) {
      const angle = radiansPerProjectile * i + this.#multipleAngle;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const missile = this.makeMissile(missileInformation);

      missile.vx = dx * missile.speed;
      missile.vy = dy * missile.speed;

      this.missileList.push(missile);
    }

    if (missileInformation.shouldTilt) {
      this.#multipleAngle += 0.02;
    }
  }

  public render(): void {
    this.missileList.forEach((missile: Missile): void => {
      if (missile.isVanished) {
        return;
      }

      if (missile.angle !== undefined) {
        missile.renderAngle(
          missile.x,
          missile.y,
          missile.width,
          missile.height,
          missile.angle,
        );
        return;
      }

      missile.render(missile.x, missile.y);
    });
  }

  setMissileRoute(missileRoute: string): void {
    this.missileList.forEach((missile: Missile): void => {
      if (missile.isVanished) {
        return;
      }

      switch (missileRoute) {
        case MISSILE_ROUTE_COMMAND.PLAYER_STRAIGHT: {
          missile.playerStraight(missile.speed);
          break;
        }

        case MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT: {
          missile.enemyStraight(missile.speed);
          break;
        }

        case MISSILE_ROUTE_COMMAND.ENEMY_AIMED: {
          missile.enemyTargetMove();
          break;
        }

        case MISSILE_ROUTE_COMMAND.GUIDED: {
          const { vx, vy, angle, targetIndex } = this.#lockOn(missile);

          missile.targetIndex = targetIndex;

          if (vx === 0 && vy === 0) {
            if (missile.vx && missile.vy) {
              missile.enemyTargetMove();

              return;
            }

            missile.playerStraight(missile.speed);
            return;
          }

          if (missile.frame < 160) {
            missile.vx = vx;
            missile.vy = vy;
            missile.angle = angle;
          }

          missile.enemyTargetMove();
          break;
        }

        case MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY: {
          missile.enemyTargetMove();
          break;
        }
      }

      missile.frame += 1;
    });
  }

  #lockOn(missile: Missile) {
    const missileVector = {
      vx: 0,
      vy: 0,
      angle: 0,
      targetIndex: null,
    };

    if (missile.targetIndex !== null) {
      const target = this.targetList[missile.targetIndex];
      missileVector.targetIndex = missile.targetIndex;

      if (target === undefined || target.isDestroyed || target.isVanished) {
        return missileVector;
      }

      return this.#getTargetDirection(target, missile);
    }

    let minDistance = Infinity;

    this.targetList.forEach((target, index) => {
      if (target.isDestroyed || target.isVanished) {
        return;
      }

      const { vx, vy, angle, distance } = this.#getTargetDirection(
        target,
        missile,
      );

      if (distance < minDistance) {
        minDistance = distance;

        missileVector.vx = vx;
        missileVector.vy = vy;
        missileVector.angle = angle;
        missileVector.targetIndex = index;
      }
    });

    return missileVector;
  }

  #getTargetDirection(target: SpaceShip, missile: Missile) {
    const targetX = target.x + target.width / 2;
    const targetY = target.y + target.height / 2;
    const missileX = missile.x + missile.width / 2;

    const dx = targetX - missileX;
    const dy = targetY - missile.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const vx = normalizedDx * missile.speed;
    const vy = normalizedDy * missile.speed;

    return {
      vx,
      vy,
      angle,
      targetIndex: missile.targetIndex,
      distance,
    };
  }
}

export default MissileLauncher;
