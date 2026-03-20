
# GitOps con Argo CD - ¿Por qué Argo CD?

**Elección**: Argo CD es **open source**, CNCF; implementa GitOps puro (estado deseado en Git, *pull-based* para sincronizar clústeres).  
**Ventajas**: auto-sync, *self-heal*, *prune*, historial auditable, *multi-cluster* y *multi-env*.  
**Integración con GitHub**: Argo CD observa tu repo de GitHub; tu **Copilot** trabaja sobre manifiestos/Charts en Git, y Argo CD aplica los cambios; no es una feature nativa de Copilot, pero **se complementan**.

**Alternativas**: FluxCD (también CNCF). Elegimos Argo por su UI y adopción amplia.  

**Ver lab10-argocd.md**.

