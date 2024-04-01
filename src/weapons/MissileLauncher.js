import Missile from "./Missile";
import Enemy from "../entities/enemies/Enemy";

import MODIFIER from "../constants/modifier";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class MissileLauncher {
  #multipleAngle = 0.1;
  #projectileNumber = 15;
  #missileYModifier = 50;
  #enemyDamage = 1;

  constructor(width, height) {
    this.x;
    this.y;
    this.width = width;
    this.height = height;

    this.missileList = [];
  }

  setTargetList(targetList) {
    this.targetList = targetList;
  }

  makeMissile({
    projectilePath,
    x,
    y,
    missileWidth,
    missileDamage = this.#enemyDamage,
    missileSpeed,
    isAimed = false,
  }) {
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
      const { vx, vy, angle } = this.getTargetDirection(missile);

      missile.vx = vx;
      missile.vy = vy;
      missile.angle = angle;
    }

    return missile;
  }

  loadSingleAmmo(missileInformation) {
    const missile = this.makeMissile(missileInformation);

    this.missileList.push(missile);
  }

  loadMultipleAmmo(missileInformation) {
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

  render() {
    this.missileList.forEach((missile) => {
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

  setMissileRoute(missileRoute) {
    this.missileList.forEach((missile) => {
      if (missile.isVanished) {
        return;
      }

      switch (missileRoute) {
        case MISSILE_ROUTE_COMMAND.PLAYER_STRAIGHT:
          missile.playerStraight(missile.speed);
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT:
          missile.enemyStraight(missile.speed);
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_AIMED:
          missile.enemyTargetMove();
          break;

        case MISSILE_ROUTE_COMMAND.GUIDED:
          const { vx, vy, angle } = this.getTargetDirection(missile);

          if (vx === 0 && vy === 0) {
            if (missile.vx && missile.vy) {
              missile.enemyTargetMove();

              return;
            }

            missile.playerStraight(missile.speed);
            return;
          }

          if (missile.frame < 160 * MODIFIER.FRAME) {
            missile.vx = vx;
            missile.vy = vy;
            missile.angle = angle;
          }

          missile.enemyTargetMove();
          break;

        case MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY:
          missile.enemyTargetMove();
          break;
      }

      missile.frame += 1;
    });
  }

  getTargetDirection(missile) {
    if (missile.isLockedOn) {
      return { vx: 0, vy: 0, angle: 0 };
    }

    let minDistance = Infinity;

    const missileVector = {
      vx: 0,
      vy: 0,
      angle: 0,
    };

    this.targetList.forEach((target) => {
      if (target.isDestroyed || target.isVanished) {
        return;
      }

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

      if (distance < minDistance) {
        minDistance = distance;

        missileVector.vx = vx;
        missileVector.vy = vy;
        missileVector.angle = angle;
      }

      if (target instanceof Enemy) {
        missile.isLockedOn = true;
      }
    });

    return missileVector;
  }
}

export default MissileLauncher;
