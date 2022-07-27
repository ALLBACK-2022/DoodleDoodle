# - - - - - - - - - -
# BROKER SETTINGS
# - - - - - - - - - -
BROKER_HEARTBEAT = 10
BROKER_HEARTBEAT_CHECKRATE = 2.0

# Setting BROKER_POOL_LIMIT to None disables pooling
# Disabling pooling causes open/close connections for every task.
# However, the rabbitMQ cluster being behind an Elastic Load Balancer,
# the pooling is not working correctly,
# and the connection is lost at some point.
# There seems no other way around it for the time being.
BROKER_POOL_LIMIT = None

BROKER_TRANSPORT_OPTIONS = {'confirm_publish': True}

BROKER_CONNECTION_TIMEOUT = 20
BROKER_CONNECTION_RETRY = True
BROKER_CONNECTION_MAX_RETRIES = 100