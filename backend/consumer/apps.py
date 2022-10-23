from django.apps import AppConfig


class ConsumerConfig(AppConfig):
    name = 'consumer'

    def ready(self):
        try:
            import consumer.signals  # noqa F401
            import consumer.handlers  # noqa F401
        except ImportError:
            pass
